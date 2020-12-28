const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RoomType = require("../models/room/roomType");
const { Room, validateRoom } = require("../models/room/room");
const { Facilities, validateFacilities } = require("../models/room/facilities");
const { Address } = require("../models/address/address");
const ObjectId = mongoose.Types.ObjectId;

const auth = require("../middleware/auth");
const isOwner = require("../middleware/owner");
const isAdmin = require("../middleware/admin");

router.get("/room-type", async (req, res) => {
  const roomType = await RoomType.find({});
  if (!roomType) return res.status(400).send("Room type invalid");
  res.send(roomType);
});

router.get("/room-type/:id", async (req, res) => {
  const roomType = await RoomType.findById(req.params.id);
  if (!roomType) return res.status(400).send("Room type invalid");
  res.send(roomType);
});

router.get("/facilities/:id", async (req, res) => {
  const facilities = await Facilities.findById(req.params.id).select("-__v");

  if (!facilities)
    return res
      .status(400)
      .send("The facilities with the given ID was not found.");
  res.send(facilities);
});

router.post("/facilities", [auth, isOwner], async (req, res) => {
  const { error } = validateFacilities(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const facilities = new Facilities({
    bathroom: req.body.bathroom,
    kitchen: req.body.kitchen,
    airCondition: req.body.airCondition,
    waterHeater: req.body.waterHeater,
    balcony: req.body.balcony,
    electricityPrice: req.body.electricityPrice,
    waterPrice: req.body.waterPrice,
    other: req.body.other,
  });

  await facilities.save();

  res.send(facilities._id);
});

router.get("/:id", async (req, res) => {
  const room = await (await Room.findById(req.params.id)).select("-__v");

  if (!room)
    return res.status(400).send("The room with the given ID was not found.");
  res.send(room);
});

router.get("/owner/:id", async (req, res) => {
  const room = await Room.find({
    idUserRef: new ObjectId(req.params.id),
  }).select("status");

  if (!room)
    return res.status(400).send("The room with the given ID was not found.");
  res.send(room);
});

router.post("/", [auth, isOwner], async (req, res) => {
  const { error } = validateRoom(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const room = new Room({
    idAddressRef: new ObjectId(req.body.idAddressRef),
    idUserRef: new ObjectId(req.body.idUserRef),
    idRoomTypeRef: new ObjectId(req.body.idRoomTypeRef),
    roomNumber: req.body.roomNumber,
    price: req.body.price,
    area: req.body.area,
    idFacilitiesRef: new ObjectId(req.body.idFacilitiesRef),
    image: req.body.image,
    isWithOwner: req.body.isWithOwner,
  });

  await room.save();
  res.send(room._id);
});

router.put("/:id", [auth, isOwner], async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(400).send("Invalid id.");

  const newRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!newRoom)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(newRoom._id);
});

module.exports = router;
