const mongoose = require("mongoose");
const City = require("./city");
const District = require("./district");
const Ward = require("./ward");

const Address = mongoose.model(
  new mongoose.Schema({
    number: {
      type: String,
      require: true,
    },
    road: {
      type: String,
      require: true,
    },
    idWardRef: {
      type: String,
      ref: Ward,
      require: true,
    },
    idDistrictRef: {
      type: String,
      ref: District,
      require: true,
    },
    idCityRef: {
      type: String,
      ref: City,
      require: true,
    },
  })
);

module.exports = Address;
