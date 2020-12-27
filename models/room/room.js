const Joi = require("joi");
const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    idAddressRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    idRoomTypeRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roomtypes",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "facilities",
      required: true,
    },
    image: {
      type: Array,
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

function validateRoom(room) {
  const schema = Joi.object({
    idAddressRef: Joi.objectId().required(),
    idUserRef: Joi.objectId().required(),
    idRoomTypeRef: Joi.objectId().required(),
    roomNumber: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required(),
    area: Joi.number().min(10).required(),
    idFacilitiesRef: Joi.objectId().required(),
    image: Joi.array().min(3).required(),
    isWithOwner: Joi.boolean().required(),
    status: Joi.boolean(),
  });

  return schema.validate(room);
}

exports.Room = Room;
exports.validateRoom = validateRoom;
