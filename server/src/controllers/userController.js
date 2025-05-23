
// Required imports
import validator from "validator";
import User from "../models/userModel.js";
import { sendEmail } from "../../sendemail.js";
import passport from "passport";
import propertyModel from "../models/PropertiesModel.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import crypto from "crypto";

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    // Validate email using validator package
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
    }
    console.log(email);
    const user = await User.findOne({ email });
   
    // Always return success response to avoid user enumeration
    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User do not exist",
      });
    }
     console.log("inside forgot password :",email)
    // Generate reset token and hash it for storing
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token and expiry on user document
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

   

    // Construct reset URL - fallback to localhost if FRONTEND_URL missing
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

    const message = `You requested a password reset. Please click the following link: \n\n${resetUrl}\n\nIf you didn't request this, please ignore this email.`;

    // Send the email with the reset link
    await sendEmail({
      email,
      subject: "Password Reset Request",
      message,
    });

     await user.save();

    return res.status(200).json({
      success: true,
      message: "Reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset link.",
    });
  }
};



function generateEmailTemplate(verificationCode) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      <p style="font-size: 16px; color: #333;">Your verification code is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${verificationCode}
        </span>
      </div>
      <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 5 minutes.</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p>Thank you,<br>S8 Team</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>
  `;
}




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

    // Optional: Validate phone number format (Uncomment if needed)
    function validatePhoneNumber(phone) {
      const phoneRegex = /^\+91\d{10}$/;
      return phoneRegex.test(phone);
    }

    
    // if (!validatePhoneNumber(phone)) {
    //   return res.status(400).json({ success: false, message: "Enter valid Phone number" });
    // }

    // Check if a verified user with this email or phone already exists
    const existingUser = await User.findOne({
      $or: [
        { email, verified: true },
        { phone, verified: true },
      ],
    });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User Already exist" });
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
      // Uncomment and implement your SMS sending logic below if needed:
      // await client.calls.create({
      //   twiml: <Response><Say>Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.</Say></Response>,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: phone,
      // });
      // return res.status(200).json({
      //   success: true,
      //   message: OTP sent.,
      // });
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

    function validatePhoneNumber(phone) {
      const phoneRegex = /^\+91\d{10}$/; 
      return phoneRegex.test(phone);
    }

    // if (!validatePhoneNumber(phone)) {
    //   return res.status(400).json({ success: false, message: "Enter valid Phone number" });
    // }

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
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production'
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
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production'
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
      sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
      secure: process.env.MODE === 'production'
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
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      console.error(err);
      return res.redirect("/login?error=OAuth failed");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    
    // Set the token in an HTTP-only cookie
    res.cookie("s8userToken", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
      secure: process.env.MODE === 'production'
    });
    return res.redirect(process.env.CLIENT_LOCALHOST);
  })(req, res);
};

// *******************************
// GET ALL PROPERTIES FUNCTIONALITY
// *******************************
export const getProperties = async (req, res) => {
  try {
    const properties = await propertyModel.find({});
    return res.status(200).json({ success: true, properties });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// ADD PROPERTY TO SAVED PROPERTIES FUNCTIONALITY
// *******************************
export const addToSavedProperties = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;
    const propertyExist = await propertyModel.findById(propertyId);
    if (!propertyExist) {
      return res.status(404).json({ success: false, message: "Property not Found" });
    }

    await User.findByIdAndUpdate(
      userId, 
      { $addToSet: { savedProperties: propertyId } }, 
      { new: true }
    );
    
    return res.status(201).json({ success: true, message: "Property added to Favourite" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// GET SAVED PROPERTIES FUNCTIONALITY
// *******************************
export const getSavedProperties = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId, savedProperties: { $exists: true, $not: { $size: 0 } } });

    if (!user) {
      return res.status(404).json({ success: false, message: "No saved Properties found" });
    }

    return res.status(200).json({ success: true, savedProperties: user.savedProperties });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// REMOVE PROPERTY FROM SAVED PROPERTIES FUNCTIONALITY
// *******************************
export const removeFromSavedProperties = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;
    const propertyExist = await User.findOne({ _id: userId, savedProperties: propertyId });
    if (!propertyExist) {
      return res.status(404).json({ success: false, message: "Property not Found" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { savedProperties: propertyId } });
    return res.status(200).json({ success: true, message: "Property removed from saved properties" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// GET PROPERTY BY ID FUNCTIONALITY
// *******************************
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.body;
    const property = await propertyModel.findById(id);
    return res.status(200).json({ success: true, property });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// GET PROFILE FUNCTIONALITY
// *******************************
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-id -verificationCode -verificationCodeExpire -verified -createdAt -updatedAt -_v");
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// UPDATE PROFILE FUNCTIONALITY
// *******************************
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, phone, address, city, state, pincode } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!name || !email || !phone || !address || !city || !state || !pincode) {
      return res.status(400).json({ success: false, message: "Provide all the fields" });
    }

    const userData = {
      name,
      email,
      phone,
      address: {
        address,
        city,
        state,
        pincode,
      }
    };

    user.set(userData);
    await user.save();
    return res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// UPDATE PROFILE IMAGE FUNCTIONALITY
// *******************************
export const updateProfileImage = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId;
    if (!file || file.length === 0) {
      return res.status(400).json({ success: false, message: "No Profile" });
    }

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "profile" }, // optional: specify a folder in Cloudinary
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        uploadStream.end(fileBuffer);
      });
    };
    const uploadedFile = await uploadToCloudinary(file.buffer);

    const imageData = {
      url: uploadedFile.secure_url,
      public_id: uploadedFile.public_id,
      fileType: file.mimetype,
    };
    const user = await User.findById(userId);

    if (user.profileImage && user.profileImage.public_id) {
      await cloudinary.v2.uploader.destroy(user.profileImage.public_id);
    }
    user.profileImage = imageData;
    await user.save();

    return res.status(200).json({ success: true, message: "Avatar Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// CHECK AUTH FUNCTIONALITY
// *******************************
export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Login first" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// GUEST PROPERTY SHOW FUNCTIONALITY
// *******************************
export const getGuestProperties = async (req, res) => {
  try {
    const pro = await propertyModel.find({});
    const properties = pro.slice(0, 4);
    return res.status(200).json({ success: true, properties });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// SEARCH PROPERTY FUNCTIONALITY
// *******************************
export const searchProperty = async (req, res) => {
  try {
    const { searchString } = req.body;

    if (!searchString || searchString.length < 3) {
      return res.status(400).json({ success: false, message: "Search string must be at least 3 characters." });
    }

    propertyModel.find({
      $text: { $search: searchString }
    })
    .then(results => {
      return res.status(200).json({ success: true, data: results });
    })
    .catch(err => {
      return res.status(404).json({ success: false, message: "No properties found matching your search." });
    });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// *******************************
// CHANGE PASSWORD FUNCTIONALITY
// *******************************
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.userId;
    // Validate that new password and confirmation match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New password and confirmation do not match." });
    }

    // Validate new password length
    if (newPassword.length < 8 || newPassword.length > 32) {
      return res.status(400).json({ error: "Password must be between 8 and 32 characters." });
    }

    // Retrieve user with password field (not selected by default)
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the old password matches the current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect." });
    }

    // Hash the new password and update the user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
