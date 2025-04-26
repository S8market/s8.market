const sendToken = (user, message, res) => {
    const token = user.generateToken();
    res
      .cookie("s8Token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ), 
        httpOnly: true,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production'
      })
      .json({
        success: true,
        token,
        message,
        user,
      });
  };

export default sendToken;
