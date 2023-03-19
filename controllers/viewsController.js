exports.getLoginForm = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  res.render("sign_in", { title: "Sign In" });
};

exports.getSignupFrom = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  res.render("sign_up", { title: "Sign Up" });
};

exports.getHomePage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  res.render("home", { title: "Home" });
};

exports.getProfile = (req, res) => {
  res.render("profile", { title: "Profile" });
};

exports.getForgotPassForm = (req, res) => {
  res.render("forgot_pass_form", { title: "Account Recover" });
};

exports.getResetForm = (req, res) => {
  res.render("reset_pass_form", {
    resetToken: req.url.split("/")[2],
    title: "Reset Pass",
  });
};
