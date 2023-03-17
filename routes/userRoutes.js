const express = require("express");
const router = express.Router();

const passport = require("passport");
const userController = require("../controllers/userController");

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/sign_in" }),
  userController.createSession
);
router.post("/create", userController.create);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;
