const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user/user");
const Role = require("../models/user/role");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { generateAuthToken } = require("../middleware/generateAuthToken");

const ObjectId = mongoose.Types.ObjectId;

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("Invalid username or password.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid username or password.");
  }

  const role = await Role.findById({ _id: new ObjectId(user.idRoleRef) });

  const token = generateAuthToken({
    _id: user._id,
    username: user.username,
    isAdmin: role.isAdmin,
    isOwner: role.isOwner,
    isConfirm: user.isConfirm,
  });

  res.send(token);
});

function validateAuth(req) {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(req);
}

module.exports = router;
