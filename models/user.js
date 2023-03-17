const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
