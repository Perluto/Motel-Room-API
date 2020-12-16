const mongoose = require("mongoose");

const User = mongoose.model(
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },

    password: {
      type: String,
      required: true,
    },
  })
);

module.exports = User;
