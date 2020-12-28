const mongoose = require("mongoose");
const Joi = require("joi");

const Follow = mongoose.model(
  "Follow",
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
  })
);

function validateFollow(cmt) {
  const schema = Joi.object({
    idUserRef: Joi.objectId().required(),
    idPostRef: Joi.objectId().required(),
  });

  return schema.validate(cmt);
}

exports.Follow = Follow;
exports.validateFollow = validateFollow;
