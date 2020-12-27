const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const DB = require("../startup/db");
const db = new DB();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const { User, validateUser } = require("../models/user/user");
const Role = require("../models/user/role");
const { UserInfo, validateUserInfo } = require("../models/user/userInfo");
const { Address, validateAddress } = require("../models/address/address");

const auth = require("../middleware/auth");
const isOwner = require("../middleware/owner");
const isAdmin = require("../middleware/admin");

router.get("/owner", [auth, isAdmin], async (req, res) => {
  const role = await Role.findOne({ isOwner: true, isAdmin: false });

  if (!role) return res.status(404).send("Error");

  const users = await User.find({ idRoleRef: new ObjectId(role._id) }).select(
    "-password -idRoleRef"
  );

  res.send(users);
});

router.get("/owner/:id", [auth, isOwner], async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "-password -idRoleRef"
  );
  if (!user) res.status(400).send("Invalid id.");

  const userInfo = await UserInfo.find({
    idUserRef: new ObjectId(req.params.id),
  });

  if (!userInfo) res.status(400).send("Invalid id.");

  res.send(userInfo);
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  const role = await Role.findOne({
    isAdmin: false,
    isOwner: req.body.isOwner,
  });

  if (!role) return res.status(404).send("Error");

  const { error } = validateUser({
    username: req.body.username,
    password: req.body.password,
    idRoleRef: role._id.toString(),
  });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  user.idRoleRef = new ObjectId(role._id);

  if (!req.body.isOwner) {
    user.isConfirm = true;
    user
      .save()
      .then(() => {
        res.send("Done");
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    user
      .save()
      .then(async (result) => {
        const address = new Address({
          number: req.body.number,
          street: req.body.street,
          idCityRef: new ObjectId(req.body.idCityRef),
          idDistrictRef: new ObjectId(req.body.idDistrictRef),
          idWardRef: new ObjectId(req.body.idWardRef),
        });
        await address.save();

        const { error } = validateUserInfo({
          idUserRef: result._id.toString(),
          name: req.body.name,
          cardId: req.body.cardId,
          phone: req.body.phone,
          address: address._id.toString(),
        });

        if (error) return res.status(400).send(error.details[0].message);

        let userInfo = new UserInfo({
          idUserRef: new ObjectId(result._id),
          name: req.body.name,
          cardId: req.body.cardId,
          phone: req.body.phone,
          address: new ObjectId(address._id),
        });
        return userInfo.save();
      })
      .then((result) => {
        res.send("Done");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});

router.put("/:id/status", [auth, isAdmin], async (req, res) => {
  const user = await User.findOne({ _id: new ObjectId(req.params.id) });
  if (!user) return res.status(400).send("Invalid id.");

  const newUser = await User.findByIdAndUpdate(
    req.params.id,
    { isConfirm: req.body.isConfirm },
    { new: true }
  );

  if (!newUser)
    return res.status(404).send("The user with the given ID was not found.");

  res.send("Done");
});

router.put("/:id/change-password", [auth, isAdmin], async (req, res) => {
  const user = await User.findOne({ _id: new ObjectId(req.params.id) }).select(
    "password"
  );
  if (!user) return res.status(400).send("Invalid id.");

  const salt = await bcrypt.genSalt(10);
  let newPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = await User.findByIdAndUpdate(
    req.params.id,
    { password: newPassword },
    { new: true }
  );

  if (!newUser)
    return res.status(404).send("The user with the given ID was not found.");

  res.send("Done");
});

router.put("/owner/:idUser/profile", [auth, isOwner], async (req, res) => {
  const data = req.body.data;
  data.idUserRef = req.params.idUser;
  const { error } = validateUserInfo(data);
  if (error) return res.status(400).send(error.details[0].message);
  const userInfo = await UserInfo.find({
    inUserRef: new ObjectId(req.params.idUser),
  });
  if (!userInfo) return res.status(400).send("Invalid id.");

  const newUser = await UserInfo.findByIdAndUpdate(
    userInfo._id,
    {
      name: data.name,
      cardId: data.cardId,
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
    { new: true }
  );

  if (!newUser)
    return res.status(404).send("The report with the given ID was not found.");

  res.send(newUser);
});

module.exports = router;
