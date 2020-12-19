const mongoose = require("mongoose");
const User = require("./user");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    isAdmin: {
      type: Boolean,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
  })
);

module.exports = Role;
