import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: String,
  url: String,
  uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
