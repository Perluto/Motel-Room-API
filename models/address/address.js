const mongoose = require("mongoose");

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
      ref: "ward",
      required: true,
    },
    idDistrictRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
    },
    idCityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
      required: true,
    },
  })
);

module.exports = Address;
