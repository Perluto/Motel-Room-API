const mongoose = require("mongoose");
const Joi = require("joi");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    idPostRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    dateTime: {
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

function validateComment(cmt) {
  const schema = Joi.object({
    idUserRef: Joi.objectId().required(),
    idPostRef: Joi.objectId().required(),
    content: Joi.string().required(),
    dateTime: Joi.string().required(),
    isConfirm: Joi.boolean(),
  });

  return schema.validate(cmt);
}

exports.Comment = Comment;
exports.validateComment = validateComment;
