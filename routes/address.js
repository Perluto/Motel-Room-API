const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Address, validateAddress } = require("../models/address/address");
const City = require("../models/address/city");
const District = require("../models/address/district");
const Ward = require("../models/address/ward");
const ObjectId = mongoose.Types.ObjectId;
const DB = require("../startup/db");
const db = new DB();

const auth = require("../middleware/auth");

router.get("/city", (req, res) => {
  db.connect();
  City.find({})
    .select("-__v")
    .then((result) => {
      if (!result)
        return res
          .status(400)
          .send("The address with the given ID was not found.");
      db.disconnect();
      res.send(result);
    });
});

router.get("/city/:id", async (req, res) => {
  db.connect();
  const city = await City.findById(req.params.id).select("-__v");
  db.disconnect();
  if (!city)
    return res.status(400).send("The address with the given ID was not found.");
  res.send(city);
});

router.get("/district/:id", async (req, res) => {
  db.connect();
  const district = await District.findById(req.params.id).select("-__v");
  db.disconnect();
  if (!district)
    return res.status(400).send("The address with the given ID was not found.");

  res.send(district);
});

router.get("/district", async (req, res) => {
  db.connect();
  const idCityRef = new ObjectId(req.query.idCityRef);
  const district = await District.find({ idCityRef: idCityRef }).select("-__v");
  db.disconnect();
  if (!district)
    return res.status(400).send("The address with the given ID was not found.");

  res.send(district);
});

router.get("/ward", async (req, res) => {
  db.connect();
  const idDistrictRef = new ObjectId(req.query.idDistrictRef);
  const district = await District.find({
    idDistrictRef: idDistrictRef,
  }).select("-__v");
  db.disconnect();
  if (!district)
    return res.status(400).send("The address with the given ID was not found.");

  res.send(district);
});

router.get("/ward/:id", async (req, res) => {
  db.connect();
  const ward = await Ward.findById(req.params.id).select("-__v");
  db.disconnect();
  if (!ward) {
    db.disconnect();
    return res.status(400).send("The address with the given ID was not found.");
  }

  res.send(ward);
});

router.get("/:id", async (req, res) => {
  db.connect();
  const address = await Address.findById(req.params.id).select("-__v");

  if (!address) {
    db.disconnect();
    return res.status(400).send("The address with the given ID was not found.");
  }

  const addressInfo = {
    number: address.number,
    road: address.road,
  };

  const city = await City.findById(address.idCityRef).select("-_id -__v");
  const district = await District.findById(address.idDistrictRef).select(
    "-_id -idCityRef -__v"
  );
  const ward = await Ward.findById(address.idWardRef).select(
    "-_id -idDistrictRef -__v"
  );

  db.disconnect();
  addressInfo.city = city.name;
  addressInfo.district = district.name;
  addressInfo.ward = ward.name;

  res.status(200).send(addressInfo);
});

router.post("/", auth, async (req, res) => {
  const data = req.body.data;
  const { error } = validateAddress(data);
  if (error) return res.status(400).send(error.details[0].message);

  db.connect();
  const city = await City.findById(data.idCityRef);
  if (!city) {
    db.disconnect();
    return res.status(400).send("Invalid ID");
  }

  const district = await District.findById(data.idDistrictRef);
  if (!district) {
    db.disconnect();
    return res.status(400).send("Invalid ID");
  }

  const ward = await Ward.findById(data.idWardRef);
  if (!ward) {
    db.disconnect();
    return res.status(400).send("Invalid ID");
  }

  const address = new Address({
    number: data.number,
    road: data.road,
    idCityRef: new ObjectId(data.idCityRef),
    idDistrictRef: new ObjectId(data.idDistrictRef),
    idWardRef: new ObjectId(data.idWardRef),
  });

  await address.save();

  db.disconnect();
  res.status(200).send("Done");
});

module.exports = router;
