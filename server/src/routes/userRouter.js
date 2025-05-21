import express from "express";
import {
  addToSavedProperties,
  getProperties,
  getSavedProperties,
  googleAuth,
  googleAuthCallback,
  login,
  logout,
  removeFromSavedProperties,
  userRegister,
  verifyOTP,
  getPropertyById,
  updateProfile,
  getProfile,
  updateProfileImage,
  checkAuth,
  getGuestProperties,
  searchProperty,
  changePassword,
  forgotPassword // ← ✅ import added
} from "../controllers/userController.js";

import userAuth from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// ✅ Public routes
userRouter.post("/register", userRegister);
userRouter.post("/otp-verification", verifyOTP);
userRouter.post("/login", login);
userRouter.get("/auth/google", googleAuth);
userRouter.get("/auth/google/callback", googleAuthCallback);
userRouter.get("/get-guest-properties", getGuestProperties);

// ✅ Forgot password route (public)
userRouter.post("/forgot-password", forgotPassword); // ← ✅ NEW route added

// ✅ Protected routes (user must be authenticated)
userRouter.get("/logout", userAuth, logout);
userRouter.post("/change-password", userAuth, changePassword);
userRouter.get("/check-auth", userAuth, checkAuth);

userRouter.get("/get-properties", userAuth, getProperties);
userRouter.get("/add-to-saved-properties", userAuth, addToSavedProperties);
userRouter.get("/get-saved-properties", userAuth, getSavedProperties);
userRouter.get("/remove-from-saved-properties", userAuth, removeFromSavedProperties);
userRouter.post("/get-property-by-id", userAuth, getPropertyById);

userRouter.post("/update-profile", userAuth, updateProfile);
userRouter.get("/get-profile", userAuth, getProfile);

// ✅ Use Multer for image upload with memoryStorage
userRouter.post("/update-profile-image", userAuth, upload.single("image"), updateProfileImage);

userRouter.post("/searchProperties", userAuth, searchProperty);

export default userRouter;
