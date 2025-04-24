import jwt from "jsonwebtoken";

// User authentication middleware
const userAuth = (req, res, next) => {
  try {
    const token = req.cookies.s8userToken;
    if (!token) {
      return res.json({ success: false, message: "Not authorized, Login Again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!token_decode) {
       return res.json({ success: false, message: "Not authorized, Login again" });
    }

    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
