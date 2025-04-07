// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "cloudinary";

// // Cloudinary Storage for Multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: "uploads",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;

import multer from "multer";

// Use memoryStorage to temporarily store file data in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
