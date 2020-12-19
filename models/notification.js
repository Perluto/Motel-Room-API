const mongoose = require("mongoose");

const UserInfo = mongoose.model(
  new mongoose.Schema({
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = UserInfo;
