import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // lastName: {
    //   type: String,
    //   // required: true,
    //   trim: true,
    // },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
      select: false,
    },
    profileImage: {
      url: String,
      public_id: String,
      fileType: String,
    },
    phone: {
      type: String,
      // required: true,
      trim: true,
    },
    // **************************************************************************
    address: {
      type: Object,
      default: {
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
    dob: {
      type: Date,
      default: null, ///////////////////////////////////////
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      // required: true,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    savedProperties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Properties",
      },
    ],
    verified: { type: Boolean, default: false },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Create a TTL index that will remove documents where verified is false after 3600 seconds (1 hour)
userSchema.index(
  { attemptedAt: 1 },
  { expireAfterSeconds: 3600, partialFilterExpression: { verified: false } }
);

// Password Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(this.password, salt);

  this.password = hassedPassword;
  next();
});

// Password Validation
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating verification Code
userSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigit = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);
    return parseInt(firstDigit + remainingDigit);
  }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 5 * 60 * 1000;

  return verificationCode;
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
