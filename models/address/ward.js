const mongoose = require("mongoose");

const Ward = mongoose.model(
  "Ward",
  new mongoose.Schema({
    name: { type: String, required: true },
    idDistrictRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
    },
  })
);

module.exports = Ward;
