// Required imports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import passport from 'passport';
import { User } from '../models/User'; // Ensure you have your User model properly imported
import { propertyModel } from '../models/Property'; // Ensure you have your Property model properly imported
import cloudinary from 'cloudinary';

// *******************************
// USER REGISTRATION FUNCTIONALITY
// *******************************
export const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    
    // Validate all required details are provided
    if (!name || !email || !phone || !password || !verificationMethod) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Check if a verified user with this email or phone already exists
    const existingUser = await User.findOne({
      $or: [
        { email, verified: true },
        { phone, verified: true },
      ],
    });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User Already exists" });
    }

    // Calculate time threshold for one hour ago
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Query registration attempts within the last hour for the provided phone or email (unverified users)
    const registrationAttemptsByUser = await User.find({
      $or: [
        { phone, verified: false },
        { email, verified: false },
      ],
      attemptedAt: { $gte: oneHourAgo }
    });
    console.log("Recent registration attempts:", registrationAttemptsByUser);

    // If more than or equal to 3 attempts have been made in the last hour, deny registration
    if (registrationAttemptsByUser.length >= 3) {
      return res.status(429).json({
        success: false,
        message:
          "You have exceeded the maximum number of attempts (3). Please try again after an hour.",
      });
    }

    // Record the new user's attempt with a timestamp
    const userData = {
      name,
      email,
      phone,
      password,
      attemptedAt: new Date(), // Timestamp for the current attempt
    };

    // Create and save the new user
    const newUser = new User(userData);
    const verificationCode = await newUser.generateVerificationCode();
    const user = await newUser.save();

    // Send verification code via the chosen verification method
    sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      phone,
      email,
      res
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to send the verification code
async function sendVerificationCode(
  verificationMethod,
  verificationCode,
  name,
  phone,
  email,
  res
) {
  try {
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode);
      await sendEmail({
        email,
        subject: "Your Verification Code from S8",
        message,
      });

      return res.status(200).json({
        success: true,
        message: `Verification email successfully sent to ${name}`,
      });
    } else if (verificationMethod === "phone") {
      const verificationCodeWithSpace = verificationCode
        .toString()
        .split("")
        .join(" ");
      return res.status(501).json({
        success: false,
        message: "Phone verification not implemented.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid verification method.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}

// *******************************
// VERIFY OTP FUNCTIONALITY
// *******************************
export const verifyOTP = async function (req, res) {
  try {
    const { email, phone, otp } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const userAllEntries = await User.find({
      $or: [
        { email, verified: false },
        { phone, verified: false },
      ],
    }).sort({ createdAt: -1 });

    if (!userAllEntries || userAllEntries.length === 0) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }
    
    let user;

    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [
          { email, verified: false },
          { phone, verified: false },
        ],
      });
    } else {
      user = userAllEntries[0];
    }

    if (user.verificationCode !== Number(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    let currentTime = Date.now();
    let verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();

    if (currentTime > verificationCodeExpire) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.verified = true;
    user.verificationCodeExpire = null;
    user.verificationCode = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    
    // Set the token in an HTTP-only cookie
    return res
      .status(200)
      .cookie("s8userToken", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
      })
      .json({
        success: true,
        message: "Account Verified",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error.",
    });
  }
};

// *******************************
// USER LOGIN FUNCTIONALITY
// *******************************
export const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email, verified: true }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    // Set the token in an HTTP-only cookie
    return res
      .status(200)
      .cookie("s8userToken", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
      })
      .json({
        success: true,
        message: "Logged in successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error.",
    });
  }
};

// *******************************
// USER LOGOUT FUNCTIONALITY
// *******************************
export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("s8userToken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
};

// *******************************
// OAUTH GOOGLE FUNCTIONALITY
// *******************************
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = (req, res) => {
  passport.authenticate("google", (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        success: false,
        message: "Authentication failed",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    // Set the token in an HTTP-only cookie
    return res
      .status(200)
      .cookie("s8userToken", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
      })
      .json({
        success: true,
        message: "Logged in successfully with Google",
      });
  })(req, res);
};

// *******************************
// ADD PROPERTY FUNCTIONALITY
// *******************************
export const addProperty = async (req, res) => {
  try {
    const { title, description, price, location, images } = req.body;

    if (!title || !description || !price || !location) {
      return res.status(400).json({ success: false, message: "Missing property details" });
    }

    // Handle image upload to Cloudinary (example)
    const uploadedImages = [];
    if (images && images.length > 0) {
      for (let img of images) {
        const uploadResponse = await cloudinary.v2.uploader.upload(img);
        uploadedImages.push(uploadResponse.secure_url);
      }
    }

    // Create new property
    const newProperty = new propertyModel({
      title,
      description,
      price,
      location,
      images: uploadedImages,
    });

    await newProperty.save();

    return res.status(200).json({ success: true, message: "Property added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// *******************************
// VIEW PROPERTY FUNCTIONALITY
// *******************************
export const viewProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
