const mongoose = require("mongoose");
const District = require("./district");

const Ward = mongoose.model(
  new mongoose.Schema({
    name: { type: String, require: true },
    idDistrictRef: { type: String, ref: District, require: true },
  })
);

module.exports = Ward;
