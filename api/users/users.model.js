"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  pwHash: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model("Users", userSchema);
