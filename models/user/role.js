const mongoose = require("mongoose");
const User = require("./user");

const Role = mongoose.model(
  new mongoose.Schema({
    idUserRef: {
      type: String,
      ref: User,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
    isOwner: {
      type: Boolean,
      require: true,
    },
  })
);

module.exports = Role;
