const mongoose = require("mongoose");

const Ward = mongoose.model(
  "Ward",
  new mongoose.Schema({
    name: { type: String, required: true },
    idDistrictRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "districts",
      required: true,
    },
  })
);

module.exports = Ward;
