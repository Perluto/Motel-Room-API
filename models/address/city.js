const mongoose = require("mongoose");

const City = mongoose.model(
  "City",
  new mongoose.Schema({ name: { type: String, required: true } })
);

module.exports = City;
