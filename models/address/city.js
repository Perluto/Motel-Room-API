const mongoose = require("mongoose");

const City = mongoose.model(
  new mongoose.Schema({ name: { type: String, require: true } })
);

module.exports = City;
