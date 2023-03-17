const express = require("express");
const passport = require("passport");
const passportLocal = require("../config/passport-local-strategy");
const router = express.Router();
const viewsController = require("../controllers/viewsController");

router.get("/", viewsController.getHomePage);
router.get("/sign_in", viewsController.getLoginForm);
router.get("/sign_up", viewsController.getSignupFrom);
router.get(
  "/profile",
  passport.checkAuthentication,
  viewsController.getProfile
);
module.exports = router;
