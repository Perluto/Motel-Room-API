const mongoose = require("mongoose");

const RoomType = mongoose.model(
  "RoomType",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

module.exports = RoomType;
