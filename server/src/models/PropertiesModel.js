import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // location: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Store User's _id
      ref: "User", // Reference the User model
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      // enum: ["Residential", "Commercial", "Industrial", "Land"],
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: Object,
      default: {
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
    image: [
      {
        url: String,
        public_id: String,
        fileType: String,
      },
    ],
    description: {
      type: String,
      default: "",
      trim: true,
    },
    video: {
      type: String,
      default: "",
      trim: true,
    },
    auctionDate: {
      // type: Date,
      type: String, // DD/MM/YYYY
      required: true,
    },
    auctionTime: {
      type: String, // HH:mm:ss
      required: true,
    },
    auctionType: {
      type: String,
      required: true,
      // enum: ["Normal", "E-auction"],
    },
    borrower: {
      type: String,
      required: true,
      trim: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
    deposit: {
      // type: Number,
      type: String,
      required: true,
    },
    bidInc: {
      type: Number,
      required: true,
    },
    inspectDate: {
      // type: Date,
      type: String, // DD/MM/YYYY
      required: true,
    },
    inspectTime: {
      type: String, // HH:mm:ss
      required: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      // match: [/^\+91\d{10}$/, "Invalid contact number"],
      trim: true,
    },
    area: {
      type: Number,
      required: true,
    },
    nearbyPlaces: {
      type: String,
      default: "",
    },
    mapLocation: {
      latitude: {
        type: String,
        required: true,
        trim: true,
      },
      longitude: {
        type: String,
        required: true,
        trim: true,
      },
    },
    auctionUrl: {
      type: String,
      required: true,
      trim: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    reservPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      enum: ["Close", "Open"],
    }

    // addedby: userid //////////////////////////////////////////////////////////////////////////
    // active //******************************************* */
  },
  { timestamps: true }
);

propertySchema.index({
  title: "text",
  category: "text",
  bankName: "text",
  "address.address": "text",
  "address.city": "text",
  "address.state": "text",
  "address.pincode": "text",
  description: "text",
  nearbyPlaces: "text"
});


const propertyModel =
  mongoose.models.Properties || mongoose.model("Properties", propertySchema);

export default propertyModel;
