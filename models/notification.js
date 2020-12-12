const mongoose = require("mongoose");
const User = require("./user/user");

const UserInfo = mongoose.model(
  new mongoose.Schema({
    idUserRef: {
      type: String,
      ref: User,
      required: true,
    },
    content: {
      type: String,
      ref: User,
    },
    status: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = UserInfo;
