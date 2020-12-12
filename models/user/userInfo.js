const mongoose = require("mongoose");
const Address = require("../address/address");
const User = require("./user");

const UserInfo = mongoose.model(
  new mongoose.Schema({
    idUserRef: {
      type: String,
      ref: User,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    cardId: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      ref: Address,
      require: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
      require: true,
    },
  })
);

module.exports = UserInfo;
