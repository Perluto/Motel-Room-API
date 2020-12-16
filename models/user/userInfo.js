const mongoose = require("mongoose");
const Address = require("../address/address");
const User = require("./user");

const UserInfo = mongoose.model(
  "UserInfo",
  new mongoose.Schema({
    idUserRef: {
      type: String,
      ref: User,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      ref: Address,
      required: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
      required: true,
    },
  })
);

module.exports = UserInfo;
