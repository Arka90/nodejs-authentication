exports.getLoginForm = (req, res) => {
  res.render("sign_in");
};

exports.getSignupFrom = (req, res) => {
  res.render("sign_up");
};

exports.getHomePage = (req, res) => {
  res.render("home");
};

exports.getProfile = (req, res) => {
  res.render("profile");
};

exports.getForgotPassForm = (req, res) => {
  res.render("forgot_pass_form");
};

exports.getResetForm = (req, res) => {
  res.render("reset_pass_form", { resetToken: req.url.split("/")[2] });
};
