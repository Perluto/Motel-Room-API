const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RoomType = require("../models/room/roomType");
const { Room, validateRoom } = require("../models/room/room");
const { Facilities, validateFacilities } = require("../models/room/facilities");
const { Address } = require("../models/address/address");
const ObjectId = mongoose.Types.ObjectId;
const DB = require("../startup/db");
const db = new DB();

const auth = require("../middleware/auth");
const isOwner = require("../middleware/owner");
const isAdmin = require("../middleware/admin");

router.get("/room-type", async (req, res) => {
  db.connect();
  const roomType = await RoomType.find({});
  if (!roomType) return res.status(400).send("Room type invalid");
  db.disconnect();
  res.send(roomType);
});

router.get("/facilities/:id", async (req, res) => {
  db.connect();
  const facilities = await Facilities.findById(req.params.id).select("-__v");

  if (!facilities)
    return res
      .status(400)
      .send("The facilities with the given ID was not found.");
  db.disconnect();
  res.send(facilities);
});

router.post("/facilities", [auth, isOwner], async (req, res) => {
  const { error } = validateFacilities(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  db.connect();
  const facilities = new Facilities({
    bathroom: req.body.bathroom,
    kitchen: req.body.kitchen,
    airCondition: req.body.airCondition,
    balcony: req.body.balcony,
    electricityPrice: req.body.electricityPrice,
    waterPrice: req.body.waterPrice,
    other: req.body.other,
  });

  await facilities.save();

  db.disconnect();
  res.send(facilities._id);
});

router.get("/:id", async (req, res) => {
  db.connect();
  const room = await Room.findById(req.params.id).select("-__v");

  if (!room)
    return res.status(400).send("The room with the given ID was not found.");
  db.disconnect();
  res.send(room);
});

router.post("/", [auth, isOwner], async (req, res) => {
  const { error } = validateRoom(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  db.connect();
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
  db.disconnect();
  res.send(room);
});

module.exports = router;
