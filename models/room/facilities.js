const mongoose = require("mongoose");

const Facilities = mongoose.model(
  new mongoose.Schema({
    bathroom: {
      type: String,
      require: true,
    },
    kitchen: {
      type: String,
      require: true,
    },
    airCondition: {
      type: Boolean,
      require: true,
    },
    balcony: {
      type: Boolean,
      require: true,
    },
    electricityPrice: {
      type: Number,
      require: true,
      min: 0,
    },
    waterPrice: {
      type: Number,
      require: true,
      min: 0,
    },
    other: {
      type: String,
    },
  })
);

module.exports = Facilities;
