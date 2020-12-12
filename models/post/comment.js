const mongoose = require("mongoose");
const Post = require("../post/post");
const User = require("../user/user");

const Comment = mongoose.model(
  new mongoose.Schema({
    idPostRef: {
      type: String,
      required: true,
    },
    idUserRef: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
    time: {
      type: Date,
      default: Date.now,
      required: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
      required: true,
    },
  })
);

module.exports = Comment;
