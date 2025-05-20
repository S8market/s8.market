import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app } from "./app.js";
import userRouter from "./routes/userRouter.js";

const port = process.env.PORT || 4000;

// Middleware (add before routes)
app.use(cookieParser());

// Configure CORS properly for credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // your frontend origin here
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());

// User routes
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});
