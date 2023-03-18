const express = require("express");
const router = express.Router();

const passport = require("passport");
const userController = require("../controllers/userController");
const { route } = require("./viewRoutes");

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

router.get("/sign_out", userController.destroy);

router.post("/reset-password", userController.resetPass);

router.post("/forgot_password", userController.forgotPass);

router.post("/reset-forgot-password/:token", userController.resetPassword);

module.exports = router;
