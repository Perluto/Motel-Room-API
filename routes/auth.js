const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { generateAuthToken } = require("../middleware/generateAuthToken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid email or password.");
  const role = await User.findById(user.idRoleRef);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = generateAuthToken({
    _id: user._id,
    username: user.username,
    isAdmin: role.isAdmin,
    isOwner: role.isOwner,
  });

  res.send(token);
});

function validate(req) {
  const schema = {
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  };

  return schema.validate(req);
}

module.exports = router;
