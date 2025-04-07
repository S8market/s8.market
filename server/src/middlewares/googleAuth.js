import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/v1/user/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const {
          email,
          given_name: name,
          family_name: lastName,
        } = profile._json;

        let user = await User.findOne({ email, verified: true });
        if (!user) {
          // Create new user if not found
          user = new User({
            name,
            lastName,
            email,
            verified: true,
            // You can store other profile details if needed
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
