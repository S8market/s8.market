import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import connectDB from "./db/index.js";
import passport from "./middlewares/googleAuth.js";
import bankUserRouter from "./routes/bankUserRouter.js";
import connectCloudinary from "./config/cloudinary.js";
import "dotenv/config";

const port = process.env.PORT;

const app = express();

app.set('trust proxy', 1);
// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://s8test-bank-frontend.onrender.com", "https://s8test-client.onrender.com", "https://s8-bank-officer.onrender.com", "https://s8market.com", "https://bank.s8market.com"],
  credentials: true,
}));

// DB connection
connectDB();
connectCloudinary();

// Initialize passport
app.use(passport.initialize());

// Google OAuth routes
// app.get("/auth/google", googleAuth);
// app.get("/auth/google/callback", googleAuthCallback);

app.get("/", (req, res) => {
  res.send("Api is Working");
});

// app.listen(port, () => console.log("Server Started at ", port));

// api endpoints
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bank-user", bankUserRouter);


// app.get("/check-auth", (req, res) => {
//   if (req.cookies.auth_token) {
//     res.json({ authenticated: true });
//   } else {
//     res.json({ authenticated: false });
//   }
// });

app.listen(port, () => console.log("Server Started at ", port));

export { app }
