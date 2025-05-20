import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import bankUserRouter from "./routes/bankUserRouter.js";
import connectDB from "./db/index.js";
import connectCloudinary from "./config/cloudinary.js";
import passport from "./middlewares/googleAuth.js";
import "dotenv/config";

const port = process.env.PORT || 4000;

const app = express();

app.set('trust proxy', 1);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://s8test-bank-frontend.onrender.com",
    "https://s8test-client.onrender.com",
    "https://s8-bank-officer.onrender.com",
    "https://s8market.com",
    "https://bank.s8market.com"
  ],
  credentials: true,
}));

// DB and Cloudinary connections
connectDB();
connectCloudinary();

// Passport initialization
app.use(passport.initialize());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bank-user", bankUserRouter);

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(port, () => console.log(`Server Started at port ${port}`));

export { app };
