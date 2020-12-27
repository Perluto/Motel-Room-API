const mongoose = require("mongoose");
const Joi = require("joi");

const UserInfo = mongoose.model(
  "UserInfo",
  new mongoose.Schema({
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
  })
);

function validateUserInfo(user) {
  const schema = Joi.object({
    idUserRef: Joi.objectId().required(),
    name: Joi.string().required(),
    cardId: Joi.string().length(10).required(),
    phone: Joi.string().length(10).required(),
    address: Joi.objectId().required(),
  });

  return schema.validate(user);
}

exports.UserInfo = UserInfo;
exports.validateUserInfo = validateUserInfo;
