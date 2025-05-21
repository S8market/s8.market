import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    // Get token from Authorization header or fallback to cookie
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.s8userToken;

    if (!token) {
      console.log("Authorization failed: No token provided");
      return res.status(401).json({ success: false, message: "Not authorized, please login again" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded.id) {
      console.log("Authorization failed: Invalid token payload");
      return res.status(401).json({ success: false, message: "Not authorized, please login again" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Authorization error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, please login again" });
  }
};

export default userAuth;
