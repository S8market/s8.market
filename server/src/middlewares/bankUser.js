import jwt from "jsonwebtoken";

// bankUser athentication middleware
const bankUserAuth = (req, res, next) => {
  try {
    const s8token = req.cookies.s8Token;
    // console.log(s8token);
    if (!s8token) {
      return res.json({ success: false, message: "Not authorized, Login First" });
    }
    const token_decode = jwt.verify(s8token, process.env.JWT_SECRET_KEY);

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

export default bankUserAuth;
