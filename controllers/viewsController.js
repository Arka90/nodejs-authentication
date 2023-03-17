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
