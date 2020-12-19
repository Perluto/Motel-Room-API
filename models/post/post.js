const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    idRoomRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
      required: true,
    },
    like: {
      type: Number,
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

function validatePost(cmt) {
  const schema = Joi.object({
    idUserRef: Joi.objectId().required(),
    idPostRef: Joi.objectId().required(),
    content: Joi.string().required(),
    isConfirm: Joi.boolean(),
  });

  return schema.validate(cmt);
}

exports.Post = Post;
exports.validatePost = validatePost;
