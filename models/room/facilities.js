const mongoose = require("mongoose");
const Joi = require("joi");

const Facilities = mongoose.model(
  "Facilities",
  new mongoose.Schema({
    bathroom: {
      type: String,
      required: true,
    },
    kitchen: {
      type: String,
      required: true,
    },
    airCondition: {
      type: Boolean,
      required: true,
    },
    balcony: {
      type: Boolean,
      required: true,
    },
    electricityPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    waterPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    other: {
      type: String,
    },
  })
);

function validateFacilities(facilities) {
  const schema = Joi.object({
    bathroom: Joi.string().required(),
    kitchen: Joi.string().required(),
    airCondition: Joi.boolean().required(),
    balcony: Joi.boolean().required(),
    electricityPrice: Joi.number().min(0).required(),
    waterPrice: Joi.number().min(0).required(),
    other: Joi.string(),
  });

  return schema.validate(facilities);
}

exports.Facilities = Facilities;
exports.validateFacilities = validateFacilities;
