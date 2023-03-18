const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new Strategy(
    {
      clientID:
        "966632513928-l9p5f7jc0cpfbmbonn4ce3j4vdb42k2p.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // find a user

      try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // if found, set this user as req.user
          return done(null, user);
        } else {
          const user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
            isSocialUser: true,
          });

          return done(null, user);
        }
      } catch (err) {
        console.log("error in google strategy-passport", err);
        return;
      }
    }
  )
);

module.exports = passport;
