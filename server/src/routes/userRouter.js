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
  changePassword
} from "../controllers/userController.js";
import userAuth from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";  


const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/otp-verification", verifyOTP);
userRouter.post("/login", login);
userRouter.get("/logout", userAuth, logout);
userRouter.get("/change-password", userAuth, changePassword);

userRouter.get("/auth/google", googleAuth);
userRouter.get("/auth/google/callback", googleAuthCallback);
userRouter.get("/profile", userAuth, (req, res) => {
    res.json({success: true, message: "Yeeee"})
  })

userRouter.get("/get-properties", userAuth, getProperties);
userRouter.get("/get-guest-properties", getGuestProperties);
userRouter.get("/add-to-saved-properties", userAuth, addToSavedProperties);
userRouter.get("/get-saved-properties", userAuth, getSavedProperties);
userRouter.get("/remove-from-saved-properties", userAuth, removeFromSavedProperties);
userRouter.post("/get-property-by-id", userAuth, getPropertyById)
userRouter.post("/update-profile",userAuth, updateProfile)
userRouter.get("/get-profile", userAuth, getProfile)
userRouter.post("/update-profile-image",userAuth, upload.single('image'), updateProfileImage)
userRouter.get("/check-auth",userAuth, checkAuth)
userRouter.post("/searchProperties",userAuth, searchProperty)






export default userRouter;
