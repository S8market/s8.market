import validator from "validator";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import passport from "passport";
import propertyModel from "../models/PropertiesModel.js";
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary";


// User Registration
export const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body; ////////////////////////////////
    if (!name || !email || !phone || !password || !verificationMethod) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating the password format
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    function validatePhoneNumber(phone) {
      const phoneRegex = /^\+91\d{10}$/; /////////////////////////////////////
      return phoneRegex.test(phone);
    }

    // if (!validatePhoneNumber(phone)) {
    //   return res.json({ success: false, message: "Enter valid Phone number" });
    // }

    const existingUser = await User.findOne({
      $or: [
        {
          email,
          verified: true,
        },
        {
          phone,
          verified: true,
        },
      ],
    });

    if (existingUser) {
      return res.json({ success: false, message: "User Already exist" });
    }

    // Registration Attempts
    const registrationAttemptsByUser = await User.find({
      $or: [
        { phone, verified: false },
        { email, verified: false },
      ],
    });

    if (registrationAttemptsByUser >= 3) {
      return res.json({
        success: false,
        message:
          "You have exceeded the maximum number of attempts (3). Please try again after an hour.",
      });
    }

    const userData = {
      name,
      email,
      phone,
      password,
    };

    const newUser = new User(userData);
    const verificationCode = await newUser.generateVerificationCode();
    const user = await newUser.save();

    sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      phone,
      email,
      res
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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

      res.status(200).json({
        success: true,
        message: `Verification email successfully sent to ${name}`,
      });
    } else if (verificationMethod === "phone") {
      const verificationCodeWithSpace = verificationCode
        .toString()
        .split("")
        .join(" ");
      // await client.calls.create({
      //   twiml: `<Response><Say>Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.</Say></Response>`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: phone,
      // });
      // res.status(200).json({
      //   success: true,
      //   message: `OTP sent.`,
      // });
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid verification method.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}

// Email Message Template
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

// Verify OTP
export const verifyOTP = async function (req, res) {
  try {
    const { email, phone, otp } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    function validatePhoneNumber(phone) {
      const phoneRegex = /^\+91\d{10}$/; ////////////////////////////////////////////
      return phoneRegex.test(phone);
    }

    // if (!validatePhoneNumber(phone)) {
    //   return res.json({ success: false, message: "Enter valid Phone number" });
    // }

    const userAllEntries = await User.find({
      $or: [
        {
          email,
          verified: false,
        },
        {
          phone,
          verified: false,
        },
      ],
    }).sort({ createdAt: -1 });

    if (!userAllEntries) {
      return res.json({ success: false, message: "User does not exist" });
    }
    // console.log(userAllEntries)
    let user;

    if (userAllEntries > 1) {
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
    // console.log(user)

    if (user.verificationCode !== Number(otp)) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    let currentTime = Date.now();
    let verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return res.json({ success: false, messae: "OTP expired" });
    }

    user.verified = true;
    user.verificationCodeExpire = null;
    user.verificationCode = null;
    await user.save();

    // sendToken(user, "Account Verified", res);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    
    // Set the token in an HTTP-only cookie
    res.cookie("s8userToken", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ), 
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    }).json({
      success: true,
      message: "Account Verified",
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error.",
    });
  }
};

// User Login
export const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email, verified: true }).select(
      "+password"
    );

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // sendToken(user, "Logged in successfully", res);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    // Set the token in an HTTP-only cookie
    res.cookie("s8userToken", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ), 
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    }).json({
      success: true,
      message: "Account Verified",
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error.",
    });
  }
};

// User Logout
export const logout = (req, res) => {
  res
    .cookie("s8userToken", "", { expires: new Date(0), httpOnly: true, 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production'
     })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
};

// OAuth Google
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = (req, res) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      console.log(err)
      return res.redirect("/login?error=OAuth failed"); //////////////*************************** */
    }

    // sendToken(user, "Logged in with Google", res);


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    
    // Set the token in an HTTP-only cookie
    res.cookie("s8userToken", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ), 
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    });

    return res.redirect( process.env.CLIENT_LOCALHOST );
  })(req, res);
};

// Get all the properties
export const getProperties = async (req, res) => {
  try {
    const properties = await propertyModel.find({});

    res.json({ success: true, properties });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messae: error.message });
  }
};

export const addToSavedProperties = async (req, res) => {
  try {
    const {userId, propertyId} = req.body
    const propertyExist = await propertyModel.findById(propertyId)
    if (!propertyExist) {
      return res.status(404).json({ success: false, message: "Property not Found" });
    }

    await User.findByIdAndUpdate(
      userId, 
      { $addToSet: { savedProperties: propertyId } }, 
      { new: true }
    );
    
    res.status(201).json({success: true, message: "Property added to Favourite"});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export const getSavedProperties = async (req, res) => {
  try {
    const {userId} = req.body
    const user = await User.findOne({ _id: userId, savedProperties: { $exists: true, $not: { $size: 0 } } });

    if (!user) {
      return res.status(404).json({ success: false, message: "No saved Properties found" });
    }

    res.status(200).json({ success: true, savedProperties: user.savedProperties });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export const removeFromSavedProperties = async (req, res) => {
  try {
    const {userId, propertyId} = req.body
    const propertyExist = await User.findOne({ _id: userId, savedProperties: propertyId})
    if (!propertyExist) {
      return res.status(404).json({ success: false, message: "Property not Found" });
    }

    await User.findByIdAndUpdate(userId, {$pull : {savedProperties: propertyId}})
    res.status(200).json({ message: "Property removed from saved properties" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.body;
    const property = await propertyModel.findById(id);
    res.json({ success: true, property });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-_id -verificationCode -verificationCodeExpire -verified -createdAt -updatedAt -__v");
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, phone, address, city, state, pincode } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!name || !email || !phone || !address || !city || !state || !pincode) {
      return res.json({ success: false, message: "Provide all the fields" });
    }

    const userData = {
      name,
      email,
      phone,
      address:{
        address,
        city,
        state,
        pincode,
      }
    };

    user.set(userData); 
    await user.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export const updateProfileImage = async (req, res) => {
  try {
    const file = req.file
    const userId = req.userId
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
    const user = await User.findById(userId)

    if (user.profileImage && user.profileImage.public_id) {
      
        await cloudinary.v2.uploader.destroy(user.profileImage.public_id);
      }
    user.profileImage = imageData
    user.save()

    res.json({success: true, message: "Avatar Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Check Auth
export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user){
      return res.json({success: false, message: "Login first"})
    }
    return res.json({success: true})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// guest property show
export const getGuestProperties = async (req, res) => {
  try {
    const pro = await propertyModel.find({});
    const properties = pro.slice(0, 4)
    res.json({ success: true, properties });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messae: error.message });
  }
};

export const searchProperty = async (req, res) => {
  try {
    const { searchString } = req.body;

    if (!searchString || searchString.length < 3) {
      return res.json({ success: false, message: "Search string must be at least 3 characters." });
    }

    propertyModel.find({
      $text: { $search: searchString }
    })
    .then(results => {
      return res.json({ success: true, data: results });
    })
    .catch(err => {
      return res.json({ success: false, message: "No properties found matching your search." });
    });
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
