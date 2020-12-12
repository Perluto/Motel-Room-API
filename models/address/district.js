const mongoose = require("mongoose");
const City = require("./city");

const District = mongoose.model(
  new mongoose.Schema({
    name: {
      type: String,
      idCityRef: { type: String, ref: City, require: true },
      require: true,
    },
  })
);

module.exports = District;
