const mongoose = require("mongoose");
const Joi = require("joi");

const Like = mongoose.model(
  "Like",
  new mongoose.Schema({
    idPostRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  })
);

function validateLike(cmt) {
  const schema = Joi.object({
    idUserRef: Joi.objectId().required(),
    idPostRef: Joi.objectId().required(),
  });

  return schema.validate(cmt);
}

exports.Like = Like;
exports.validateLike = validateLike;
