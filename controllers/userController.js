const User = require("../models/user");
const welcomeMailer = require("../mailers/welcome_mailer");
const welcomeEmailWorker = require("../workers/welcome_email_worker");
const signinMailer = require("../mailers/signin_mailer");
const signinEmailWorker = require("../workers/signin_email_worker");
const forgotPassMailer = require("../mailers/forgot_pass_mailer");
const request = require("request");
const crypto = require("crypto");
const queue = require("../config/kue");

module.exports.create = async function (req, res) {
  try {


    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Password Dose not match !");
      return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      let user = await User.create(req.body);
      req.flash("success", "You have signed up, login to continue!");
      let job = queue.create("emails", user).save(function (err) {
        if (err) {
          console.log("Error in creating a queue", err);
          return;
        }

        console.log("job enqueued", job.id);
      });
      return res.redirect("/sign_in");
    } else {
      req.flash("success", "You Already have an account");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.createSession = function (req, res) {
  req.flash("success", "You have Successfylly logged in !");

  let job = queue.create("emails_signed_in", req.user).save(function (err) {
    if (err) {
      console.log("Error in creating a queue", err);
      return;
    }

    console.log("job enqueued", job.id);
  });
  return res.redirect("/profile");
};

module.exports.destroy = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Signed Out Successfylly");
    res.redirect("/sign_in");
  });
};

module.exports.resetPass = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (
      !user ||
      !(await user.correctPassword(req.body.current_password, user.password))
    ) {
      req.flash("success", "Wrong Password");
      return res.redirect("back");
    }

    if (req.body.new_password != req.body.confirm_password) {
      req.flash("success", "Password did not matched");
      return res.redirect("back");
    }

    user.password = req.body.new_password;

    await user.save();
    req.flash("success", "Password Reset successful");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.forgotPass = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash("error", "No User found !");
    return res.redirect("back");
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-from/${resetToken}`;

  forgotPassMailer.resetPassLink(resetUrl, user);
  req.flash("success", "Check your mail to continue");

  return res.redirect("back");
};

module.exports.resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    req.flash("error", "Verification Failed");
    return res.redirect("/forgot_password");
  }

  if (req.body.new_password != req.body.confirm_password) {
    req.flash("error", "Password not matched");
    return res.redirect("back");
  }

  user.password = req.body.new_password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  req.flash("success", "Password Changed");
  return res.redirect("/sign_in");
};
