import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const bankUserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      // required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    employeeID: {
      type: String,
      // required: true,
      trim: true,
      // lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    bankName: {
      type: String,
      //   required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    bankBranch: {
      type: String,
      //   required: true,
      trim: true,
      lowercase: true,
    },
    bankIFSC: {
      type: String,
      //   required: true,
      trim: true,
      lowercase: true,
    },
    branchZone: {
      type: String,
      //   required: true,
      trim: true,
      lowercase: true,
    },
    bankProfileImage: {
      url: String,
      public_id: String,
      fileType: String,
    },
    designation: {
      type: String,
      //   required: true,
      trim: true,
      lowercase: true,
    },
    bankAddress: {
      type: Object,
      default: {
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
    },

    addedProperties: [
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
bankUserSchema.index(
  { attemptedAt: 1 },
  { expireAfterSeconds: 3600, partialFilterExpression: { verified: false } }
);

// Password Hashing
bankUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(this.password, salt);

  this.password = hassedPassword;
  next();
});

// Password Validation
bankUserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating verification Code
bankUserSchema.methods.generateVerificationCode = function () {
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

bankUserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const bankUser =
  mongoose.models.bankUser || mongoose.model("bankUser", bankUserSchema);

export default bankUser;
