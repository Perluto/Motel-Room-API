const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RoomType = require("../models/room/roomType");
const Room = require("../models/room/room");
const Facilities = require("../models/room/facilities");
const ObjectId = mongoose.Types.ObjectId;

router.get("/room-type", async (req, res) => {
  const roomType = RoomType.find({});
  res.send(roomType);
});

router.post("/facilities", async (req, res) => {});

module.exports = router;
