const mongoose = require("mongoose");
const Room = require("../room/room");
const User = require("../user/user");

const Post = mongoose.model(
  new mongoose.Schema({
    idRoomRef: {
      type: String,
      ref: Room,
      required: true,
    },
    idUserRef: {
      type: String,
      ref: User,
      required: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
      required: true,
    },
    view: {
      type: Number,
      default: 0,
      require: true,
    },
    like: {
      type: Number,
      require: true,
    },
    postedDate: {
      type: Date,
      require: true,
    },
    dueDate: {
      type: Date,
      require: true,
    },
  })
);

module.exports = Post;
