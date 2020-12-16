const mongoose = require("mongoose");

const RoomType = mongoose.model(
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

module.exports = RoomType;
