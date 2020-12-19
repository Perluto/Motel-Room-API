const mongoose = require("mongoose");
const Joi = require("joi");

const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
    number: {
      type: String,
      required: true,
    },
    road: {
      type: String,
      required: true,
    },
    idWardRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wards",
      required: true,
    },
    idDistrictRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "districts",
      required: true,
    },
    idCityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
  })
);

function validateAddress(address) {
  const schema = Joi.object({
    number: Joi.string().required(),
    road: Joi.string().required(),
    idWardRef: Joi.objectId().required(),
    idDistrictRef: Joi.objectId().required(),
    idCityRef: Joi.objectId().required(),
  });

  return schema.validate(address);
}

exports.Address = Address;
exports.validateAddress = validateAddress;
