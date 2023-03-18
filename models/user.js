const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Tell us your name"],
    },
    email: {
      type: String,
      required: [true, "A User must have a Email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Provide a password"],
      minlength: 8,
    },
    isSocialUser: {
      type: Boolean,
      default: false,
    },

    passwordResetToken: String,

    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //Only run if password is modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
