import validator from "validator";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import passport from "passport";
import bankUser from "../models/bankUserModel.js";
import propertyModel from "../models/PropertiesModel.js";
import cloudinary from "cloudinary";

// bankUser Registration
export const bankUserRegister = async (req, res) => {
  try {
    const { firstName, email, phone, password, verificationMethod, bankName, lastName, address, city, state, pincode, bankbranch, employeeID, designation } =
      req.body; ////////////////////////////////
      console.log(bankName, lastName  )
      if (!firstName || !email || !phone || !password || !verificationMethod || !lastName|| !address|| !city|| !state|| !pincode|| !bankbranch || !employeeID || !designation) {
      console.log(firstName, email, phone, password, verificationMethod, bankName, lastName, address, city, state, pincode, bankbranch, employeeID, designation)
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

    const existingUser = await bankUser.findOne({
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
    const registrationAttemptsByUser = await bankUser.find({
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
      firstName,
      email,
      phone,
      password,
      bankAddress: {
        type: Object,
          address,
          city,
          state,
          pincode,
      },
      bankName,lastName,  bankbranch, employeeID, designation
    };

    const newUser = new bankUser(userData);
    const verificationCode = await newUser.generateVerificationCode();
    const user = await newUser.save();

    sendVerificationCode(
      verificationMethod,
      verificationCode,
      firstName,
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
  firstName,
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
        message: `Verification email successfully sent to ${firstName}`,
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

    const userAllEntries = await bankUser
      .find({
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
      })
      .sort({ createdAt: -1 });

    if (!userAllEntries) {
      return res.json({ success: false, message: "User does not exist" });
    }

    let user;

    if (userAllEntries > 1) {
      user = userAllEntries[0];

      await bankUser.deleteMany({
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
      return res.json({ success: false, message: "Invalid OTP" });
    }

    let currentTime = Date.now();
    let verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.verified = true;
    user.verificationCodeExpire = null;
    user.verificationCode = null;
    await user.save();

    sendToken(user, "Account Verified", res);
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

    const user = await bankUser
      .findOne({ email, verified: true })
      .select("+password");

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    sendToken(user, "Logged in successfully", res);
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
  return res
    .cookie("s8Token", "", { expires: new Date(Date.now()) ,
      httpOnly: true,
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
      return res.redirect("/login?error=OAuth failed");
    }
    // Generate token and send response
    sendToken(user, "Logged in with Google", res);
  })(req, res);
};

// Add the Property
export const addProperties = async function (req, res) {
  try {
    const userId = req.userId;
    const {
      title,
      category,
      auctionType,
      auctionDate,
      auctionTime,
      area,
      price,
      description,
      video,
      auctionUrl,
      nearbyPlaces,
      address,
      contact,
      borrower,
      amountDue,
      deposit,
      bidInc,
      inspectDate,
      inspectTime,
      reservPrice,
      message,
      latitude,
      longitude,
    } = req.body;

    const files  = req.files;

    if (!userId) {
      return res.json({ success: false, message: "Unauthorized Access, Login Again" });
    }

    if (
      !title ||
      !category ||
      !auctionDate ||
      !auctionTime ||
      !area ||
      !price ||
      !description ||
      !auctionUrl ||
      !nearbyPlaces ||
      !address ||
      !auctionType ||
      !contact ||
      !borrower ||
      !amountDue ||
      !deposit ||
      !bidInc ||
      !inspectDate ||
      !inspectTime ||
      !reservPrice ||
      !message ||
      !latitude ||
      !longitude
    ) {
      return res.json({ success: false, message: "Provide all the fields" });
    }

    if (!files || files.length === 0) {
      console.log("No files uploaded");
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // ===== Upload files to Cloudinary =====
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "properties" }, // optional: specify a folder in Cloudinary
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
    
    // Upload each file and collect the results
    const uploadedFiles = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer))
    );
    
    // Map the uploaded file results to objects containing URL, public_id, and file type (from multer file metadata)
    const imageData = uploadedFiles.map((result, index) => ({
      url: result.secure_url,
      public_id: result.public_id,
      fileType: files[index].mimetype,
    }));

    const user = await bankUser.findById(userId);

    const propertyData = {
      userId,
      title,
      category,
      auctionDate,
      auctionTime,
      area,
      price,
      description,
      video,
      auctionUrl,
      nearbyPlaces,
      mapLocation: {
        latitude,
        longitude,
      },
      address: JSON.parse(address),
      auctionType,
      contact,
      borrower,
      amountDue,
      deposit,
      bidInc,
      inspectDate,
      inspectTime,
      reservPrice,
      message,
      image: imageData,
      bankName: user.bankName,
    };

    const newProperty = new propertyModel(propertyData);
    await newProperty.save();

    return res.status(201).json({
      success: true,
      message: "Property added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update the Properties
export const updateProperties = async function (req, res) {
  try {
    console.log("reached")
    const userId = req.userId;
    console.log(userId);
    const {
      propertyId,
      title,
      category,
      auctionType,
      auctionDate,
      auctionTime,
      area,
      price,
      description,
      video,
      auctionUrl,
      nearbyPlaces,
      address,
      contact,
      borrower,
      amountDue,
      deposit,
      bidInc,
      inspectDate,
      inspectTime,
      reservPrice,
      message,
      latitude,
      longitude,
    } = req.body;

    // const  files  = req.files;

    if (!userId) {
      return res.json({ success: false, message: "Unauthorized Access, Login Again" });
    }

    if (
      !title ||
      !category ||
      !auctionDate ||
      !auctionTime ||
      !area ||
      !price ||
      !description ||
      !auctionUrl ||
      !nearbyPlaces ||
      !address ||
      !auctionType ||
      !contact ||
      !borrower ||
      !amountDue ||
      !deposit ||
      !bidInc ||
      !inspectDate ||
      !inspectTime ||
      !reservPrice ||
      !message ||
      !latitude ||
      !longitude
    ) {
      console.log(
          propertyId,
          title,
          category,
          auctionType,
          auctionDate,
          auctionTime,
          area,
          price,
          description,
          auctionUrl,
          nearbyPlaces,
          address,
          contact,
          borrower,
          amountDue,
          deposit,
          bidInc,
          inspectDate,
          inspectTime,
          reservPrice,
          message,
          latitude,
          longitude,
      )
      return res.json({ success: false, message: "Provide all the fields" });
    }

    // if (!files || files.length === 0) {
    //   console.log("No files uploaded");
    //   return res.status(400).json({ success: false, message: "No files uploaded" });
    // }

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access, Login Again" });
    }

    if (!propertyId) {
      return res
        .status(400)
        .json({ success: false, message: "Property ID is required." });
    }

    // Get user details
    const user = await bankUser.findById(userId);

    // Find existing property entry
    const existingProperty = await propertyModel.findOne({
      _id: propertyId,
      bankName: user.bankName,
    });

    // if (existingProperty && existingProperty.image.length > 0) {
    //   // Delete old images using public_id
    //   await Promise.all(
    //     existingProperty.image.map((img) =>
    //       cloudinary.uploader.destroy(img.public_id)
    //     )
    //   );
    // }

    // Upload new files and store public_id
    // const uploadedFiles = await Promise.all(
    //   req.files.map(async (file) => {
    //     const uploadResponse = await cloudinary.uploader.upload(file.path);
    //     return {
    //       url: uploadResponse.secure_url,
    //       public_id: uploadResponse.public_id, // Store new public ID
    //       fileType: file.mimetype,
    //     };
    //   })
    // );

    const updatedPropertyData = {
      title,
      category,
      auctionDate,
      auctionTime,
      area,
      price,
      description,
      video,
      auctionUrl,
      nearbyPlaces,
      mapLocation: {
        latitude,
        longitude,
      },
      address: JSON.parse(address),
      auctionType,
      contact,
      borrower,
      amountDue,
      deposit,
      bidInc,
      inspectDate,
      inspectTime,
      reservPrice,
      message,
      // image: uploadedFiles,
      // bankName: user.bankName,
    };

    // Update property record
    const updatedProperty = await propertyModel.findOneAndUpdate(
      { _id: propertyId, bankName: user.bankName },
      updatedPropertyData
    );

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProperty = async function (req, res) {
  try {
    const userId = req.userId;
    const { propertyId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access, Login Again" });
    }

    if (!propertyId) {
      return res
        .status(400)
        .json({ success: false, message: "Property ID is required." });
    }

    // Get user details
    const user = await bankUser.findById(userId);

    // Find existing property entry
    const existingProperty = await propertyModel.findOne({
      _id: propertyId,
      bankName: user.bankName,
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found or unauthorized.",
      });
    }

    if (existingProperty.image.length > 0) {
      await Promise.all(
        existingProperty.image.map(async (img) => {
          const result = await cloudinary.uploader.destroy(img.public_id);
        })
      );
    }

    // Delete the property from the database
    await propertyModel.deleteOne({ _id: propertyId, bankName: user.bankName });

    return res
      .status(200)
      .json({ success: true, message: "Property deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// To get the properties of their respective bank
export const getProperties = async (req, res) => {
  try {
    const userId = req.userId;
    const userBank = await bankUser.findById( userId ); 
    const bankName = userBank?.bankName
    const properties = await propertyModel.find({ bankName }); 
    res.json({ success: true, properties });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get the property by ID
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

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await bankUser.findById(userId).select("-_id -verificationCode -verificationCodeExpire -verified -createdAt -updatedAt -__v");
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
    const { firstName, lastName, email, phone, bankBranch, bankIFSC, branchZone, designation, bankAddress } = req.body;
    console.log(req.body)
    const user = await bankUser.findById(userId);
    // const files = req.files;

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if(!firstName || !lastName || !email || !phone || !bankBranch || !bankIFSC || !branchZone || !designation || !bankAddress) {
      return res.json({ success: false, message: "Provide all the fields" });
    }

    // if (!files || files.length === 0) {
    //   return res.status(400).json({ success: false, message: "No Profile" });
    // }

    // const uploadToCloudinary = (fileBuffer) => {
    //   return new Promise((resolve, reject) => {
    //     const uploadStream = cloudinary.v2.uploader.upload_stream(
    //       { folder: "profile" }, // optional: specify a folder in Cloudinary
    //       (error, result) => {
    //         if (result) {
    //           resolve(result);
    //         } else {
    //           reject(error);
    //         }
    //       }
    //     );
    //     uploadStream.end(fileBuffer);
    //   });
    // };

    // const uploadedFiles = await Promise.all(
    //   files.map((file) => uploadToCloudinary(file.buffer))
    // );

    // const imageData = uploadedFiles.map((result, index) => ({
    //   url: result.secure_url,
    //   public_id: result.public_id,
    //   fileType: files[index].mimetype,
    // }));

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      bankBranch,
      bankIFSC,
      branchZone,
      designation,
      bankAddress,
      // image: imageData,
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
    const user = await bankUser.findById(userId)

    if (user.bankProfileImage && user.bankProfileImage.public_id) {
      
        await cloudinary.v2.uploader.destroy(user.bankProfileImage.public_id);
        console.log("Previous image deleted successfully");
      }
    user.bankProfileImage = imageData
    user.save()

    res.json({success: true, message: "Avatar Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Search Property
// export const searchProperty = async (req, res) => {
//   try {
//     const userId = "67b0df3d321e1f57fd794c1a"
//     const { searchString } = req.body;
    
//     // Validate search string length
//     if (!searchString || searchString.length < 3) {
//       return res.json({ success: false, message: "Search String is short" });
//     }

//     // Step 1: Check if any document matches the search string for the given user
//     const foundDocs = await propertyModel.find({
//       userId,
//       $or: [
//         { title: { $regex: searchString, $options: "i" } },
//         { category: { $regex: searchString, $options: "i" } },
//         { bankName: { $regex: searchString, $options: "i" } },
//         { address: { $regex: searchString, $options: "i" } },
//         { description: { $regex: searchString, $options: "i" } },
//         { nearbyPlaces: { $regex: searchString, $options: "i" } }
//       ]
//     });
    
//     if (foundDocs && foundDocs.length > 0) {
//       // Step 2: If at least one matching document exists, retrieve all documents for that user
//       const allDocs = await propertyModel.find({ userId });
//       return res.json({ success: true, data: allDocs });
//     } else {
//       return res.json({ success: false, message: "No documents contain the search string." });
//     }
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// export const searchProperty = async (req, res) => {
//   try {
//     // Get userId from authenticated user
//     const userId = "67b0df3d321e1f57fd794c1a"
//     const { searchString } = req.body;

//     // Validate search string length
//     if (!searchString || searchString.length < 3) {
//       return res.json({ success: false, message: "Search string must be at least 3 characters." });
//     }

//     // Escape special regex characters to prevent injection
//     const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     const escapedSearch = escapeRegex(searchString);
//     // const foundProperties = await propertyModel.find()

//     // Search across specified fields with regex
//     const foundProperties = await propertyModel.find({
//       userId,
//       $or: [
//         { title: { $regex: escapedSearch, $options: "i" } },
//         { category: { $regex: escapedSearch, $options: "i" } },
//         { bankName: { $regex: escapedSearch, $options: "i" } },
//         { address: { $regex: escapedSearch, $options: "i" } },
//         { description: { $regex: escapedSearch, $options: "i" } },
//         { nearbyPlaces: { $regex: escapedSearch, $options: "i" } }
//       ]
//     });

//     console.log(foundProperties)

//     if (foundProperties.length > 0) {
//       return res.json({ success: true, data: foundProperties });
//     } else {
//       return res.json({ success: false, message: "No properties found matching your search." });
//     }
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };


export const searchProperty = async (req, res) => {
  try {
    const userId = req.userId; 
    const { searchString } = req.body;

    if (!searchString || searchString.length < 3) {
      return res.json({ success: false, message: "Search string must be at least 3 characters." });
    }

    const user = await bankUser.findById(userId)

    propertyModel.find({
      bankName: user.bankName,
      $text: { $search: searchString }
    })
    .then(results => {
      return res.json({ success: true, data: results });
    })
    .catch(err => {
      return res.json({ success: false, message: "No properties found matching your search." });
    });
    
    
    // if (foundProperties.length > 0) {
    //   return res.json({ success: true, data: foundProperties });
    // } else {
    //   return res.json({ success: false, message: "No properties found matching your search." });
    // }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



// Get Top auctioners
export const topAuctioners = async (req, res) => {
  try {
    // const topAuctionUser = await bankUser.fin
    async function topAuctionUser() {
      let obj = {};
      const users = await bankUser.find();
      for (let user in users) {
        if (obj[users[user].bankName]) {
          obj[users[user].bankName] += users[user].viewCount;
        } else {
          obj[users[user].bankName] = users[user].viewCount;
        }
      }
      const sortedArray = Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => entry[0]);
      res.json({ sortedArray });
    }

    topAuctionUser();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Check Auth
export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId
    const user = await bankUser.findById(userId)
    if (!user){
      return res.json({success: false, message: "Login first"})
    }
    return res.json({success: true})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}