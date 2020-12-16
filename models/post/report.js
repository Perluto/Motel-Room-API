const mongoose = require("mongoose");
const User = require("../user/user");
const Post = require("../post/post");

const ReportSchema = new mongoose.Schema({
  idUserRef: {
    type: String,
    ref: User,
    required: true,
  },
  idPostRef: {
    type: String,
    ref: Post,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  isConfirm: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
