const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Address = require("../models/address/address");
const City = require("../models/address/city");
const District = require("../models/address/district");
const Ward = require("../models/address/ward");
const ObjectId = mongoose.Types.ObjectId;

router.get("/city", async (req, res) => {
  const city = await City.find({}).select();

  if (!city)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(city);
});

router.get("/city/:id", async (req, res) => {
  const city = await City.findById(req.params.id);

  if (!city)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(city);
});

router.get("/district/:id", async (req, res) => {
  const district = await District.findById(req.params.id).select();

  if (!district)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(district);
});

router.get("/district", async (req, res) => {
  const idCityRef = new ObjectId(req.query.idCityRef);
  const district = await District.find({ idCityRef: idCityRef }).select();

  if (!district)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(district);
});

router.get("/ward", async (req, res) => {
  const idDistrictRef = new ObjectId(req.query.idDistrictRef);
  const district = await District.find({
    idDistrictRef: idDistrictRef,
  }).select();

  if (!district)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(district);
});

router.get("/ward/:id", async (req, res) => {
  const ward = await Ward.findById(req.params.id).select();

  if (!ward)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(ward);
});

router.get("/:id", async (req, res) => {
  const address = await Address.findById(req.params.id).select();

  if (!address)
    return res.status(404).send("The address with the given ID was not found.");

  const addressInfo = {
    number: address.number,
    road: address.road,
  };

  const city = await City.findById(address.idCityRef).select("-_id");
  const district = await District.findById(address.idDistrictRef).select(
    "-_id -idCityRef"
  );
  const ward = await Ward.findById(address.idWardRef).select(
    "-_id -idDistrictRef"
  );
  addressInfo.city = city.name;
  addressInfo.district = district.name;
  addressInfo.ward = ward.name;

  res.send(addressInfo);
});

router.post("/", async (req, res) => {
  const city = await City.findById(req.body.idCityRef);
  if (!city) return res.status(400).send("Invalid ID");

  const district = await District.findById(req.body.idDistrictRef);
  if (!district) return res.status(400).send("Invalid ID");

  const ward = await Ward.findById(req.body.idWardRef);
  if (!ward) return res.status(400).send("Invalid ID");

  const address = new Address({
    number: req.body.number,
    road: req.body.road,
    idCityRef: new ObjectId(req.body.idCityRef),
    idDistrictRef: new ObjectId(req.body.idDistrictRef),
    idWardRef: new ObjectId(req.body.idWardRef),
  });

  await address.save();
});

module.exports = router;
