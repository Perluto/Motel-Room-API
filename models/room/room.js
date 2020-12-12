const mongoose = require("mongoose");
const RoomType = require("./roomType");
const Facilities = require("./facilities");
const User = require("../user/user");
const Address = require("../address/address");

const Room = mongoose.model(
  new mongoose.Schema({
    idAddressRef: {
      type: String,
      ref: Address,
      require: true,
    },
    idUserRef: {
      type: String,
      ref: User,
      require: true,
    },
    idRoomTypeRef: {
      type: String,
      ref: RoomType,
      require: true,
    },
    relatedArea: {
      type: String,
    },
    roomNumber: {
      type: Number,
      min: 1,
      require: true,
    },
    price: {
      type: Number,
      min: 0,
      require: true,
    },
    area: {
      type: Number,
      min: 0,
      require: true,
    },
    idFacilitiesRef: {
      type: String,
      ref: Facilities,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    isWithOwner: {
      type: Boolean,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
      require: true,
    },
  })
);

module.exports = Room;
