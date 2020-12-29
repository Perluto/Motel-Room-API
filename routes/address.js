const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Address, validateAddress } = require("../models/address/address");
const City = require("../models/address/city");
const District = require("../models/address/district");
const Ward = require("../models/address/ward");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/city", async (req, res) => {
  const city = await City.find({}).select("-__v");
  if (!city) return res.status(400).send().send("Error");
  res.send(city);
});

router.get("/city/:id", async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(400).send("Invalid Id");

  const city = await City.findById(req.params.id).select("-__v");
  if (!city) {
    return res.status(400).send("The address with the given ID was not found.");
  }
  res.send(city);
});

router.get("/district", async (req, res) => {
  if (!validateObjectId(req.query.idCityRef))
    return res.status(400).send("Invalid Id");

  const idCityRef = new ObjectId(req.query.idCityRef);
  const district = await District.find({ idCityRef: idCityRef }).select("-__v");
  if (!district) {
    return res.status(400).send("The address with the given ID was not found.");
  }

  res.send(district);
});

router.get("/district/:id", async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(400).send("Invalid Id");

  const district = await District.findById(req.params.id).select("-__v");
  if (!district) {
    return res.status(400).send("The address with the given ID was not found.");
  }

  res.send(district);
});

router.get("/ward", async (req, res) => {
  if (!validateObjectId(req.query.idDistrictRef))
    return res.status(400).send("Invalid Id");

  const idDistrictRef = new ObjectId(req.query.idDistrictRef);
  const district = await Ward.find({
    idDistrictRef: idDistrictRef,
  }).select("-__v");
  if (!district) {
    return res.status(400).send("The address with the given ID was not found.");
  }

  res.send(district);
});

router.get("/ward/:id", async (req, res) => {
  if (!validateObjectId(req.query.req.params.id))
    return res.status(400).send("Invalid Id");

  const ward = await Ward.findById(req.params.id).select("-__v");
  if (!ward) {
    return res.status(400).send("The address with the given ID was not found.");
  }

  res.send(ward);
});

router.get("/:id", async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(400).send("Invalid Id");

  const address = await Address.findById(req.params.id)
    .populate("idCityRef idDistrictRef idWardRef", "name -_id")
    .select("-__v");
  if (!address) {
    return res.status(400).send("The address with the given ID was not found.");
  }
  res.status(200).send(address);
});

router.post("/", auth, async (req, res) => {
  const data = req.body.data;
  const { error } = validateAddress(data);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const city = await City.findById(data.idCityRef);
  if (!city) {
    return res.status(400).send("Invalid ID");
  }

  const district = await District.findById(data.idDistrictRef);
  if (!district) {
    return res.status(400).send("Invalid ID");
  }

  const ward = await Ward.findById(data.idWardRef);
  if (!ward) {
    return res.status(400).send("Invalid ID");
  }

  const address = new Address({
    number: data.number,
    street: data.street,
    idCityRef: new ObjectId(data.idCityRef),
    idDistrictRef: new ObjectId(data.idDistrictRef),
    idWardRef: new ObjectId(data.idWardRef),
  });

  await address.save();
  res.status(200).send(address._id);
});

module.exports = router;
