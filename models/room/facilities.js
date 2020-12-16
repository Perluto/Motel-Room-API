const mongoose = require("mongoose");

const Facilities = mongoose.model(
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

module.exports = Facilities;
