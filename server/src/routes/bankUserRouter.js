import express from "express";
import {
  addProperties,
  bankUserRegister,
  checkAuth,
  deleteProperty,
  getProfile,
  getProperties,
  getPropertyById,
  login,
  logout,
  searchProperty,
  topAuctioners,
  updateProfile,
  updateProfileImage,
  updateProperties,
  verifyOTP,
  changePassword,
  checkCookieToken
} from "../controllers/bankUserController.js";
import bankUserAuth from "../middlewares/bankUser.js";
import upload from "../middlewares/multer.js";  


const bankUserRouter = express.Router();

bankUserRouter.post("/register", bankUserRegister);
bankUserRouter.post("/otp-verification", verifyOTP);
bankUserRouter.post("/login", login);
bankUserRouter.get("/logout",bankUserAuth, logout);
bankUserRouter.get("/change-password",bankUserAuth, changePassword);
bankUserRouter.post("/add-property", bankUserAuth, upload.array('files'), addProperties)
bankUserRouter.post("/update-property", bankUserAuth, upload.array('files'), updateProperties)
bankUserRouter.post("/delete-property", bankUserAuth, deleteProperty)
bankUserRouter.get("/get-property", bankUserAuth, getProperties)
bankUserRouter.post("/get-property-by-id", bankUserAuth, getPropertyById)
bankUserRouter.get("/top-auctioners",bankUserAuth, topAuctioners)
bankUserRouter.get("/get-profile",bankUserAuth, getProfile)
bankUserRouter.post("/update-profile",bankUserAuth, updateProfile)
bankUserRouter.post("/update-profile-image",bankUserAuth, upload.single('image'), updateProfileImage)
bankUserRouter.post("/searchProperties",bankUserAuth, searchProperty)
bankUserRouter.get("/check-auth",bankUserAuth, checkAuth)
bankUserRouter.get("/verify-token", bankUserAuth, checkCookieToken)
export default bankUserRouter;
