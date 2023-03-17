const User = require("../models/user");

module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect("/sign_in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.createSession = function (req, res) {
  return res.redirect("/profile");
};
