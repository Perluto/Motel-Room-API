const mongoose = require("mongoose");

const User = mongoose.model(
  new mongoose.Schema({
    username: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 50,
    },

    password: {
      type: String,
      require: true,
    },
  })
);

module.exports = User;
