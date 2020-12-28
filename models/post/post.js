const Joi = require("joi");
const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    idRoomRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
      required: true,
    },
    postName: {
      type: String,
      required: true,
    },
    view: {
      type: Number,
      default: 0,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
      required: true,
    },
    follow: {
      type: Number,
      default: 0,
      required: true,
    },
    postedDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  })
);

function validatePost(post) {
  const schema = Joi.object({
    idUserRef: Joi.objectId().required(),
    idRoomRef: Joi.objectId().required(),
    postName: Joi.string().required(),
    postedDate: Joi.string().required(),
    dueDate: Joi.string().required(),
  });

  return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;
