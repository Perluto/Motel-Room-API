const mongoose = require("mongoose");
const RoomType = require("./roomType");
const Facilities = require("./facilities");
const User = require("../user/user");
const Address = require("../address/address");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    idAddressRef: {
      type: String,
      ref: Address,
      required: true,
    },
    idUserRef: {
      type: String,
      ref: User,
      required: true,
    },
    idRoomTypeRef: {
      type: String,
      ref: RoomType,
      required: true,
    },
    relatedArea: {
      type: String,
    },
    roomNumber: {
      type: Number,
      min: 1,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    area: {
      type: Number,
      min: 0,
      required: true,
    },
    idFacilitiesRef: {
      type: String,
      ref: Facilities,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isWithOwner: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  })
);

module.exports = Room;
