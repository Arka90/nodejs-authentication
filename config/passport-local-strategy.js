const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../models/user");

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (!user || !(await user.correctPassword(password, user.password))) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log("Error in finding the user --> Passport");
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);

    return done(null, user);
  } catch (err) {
    console.log("Error in finding the user --> Passport");
    return done(err);
  }
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/sign_in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
