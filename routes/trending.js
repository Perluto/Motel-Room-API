const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const ObjectId = mongoose.Types.ObjectId;
const { Post, validatePost } = require("../models/post/post");
const { User } = require("../models/user/user");
const { Follow, validateFollow } = require("../models/post/follow");

const auth = require("../middleware/auth");
const isOwner = require("../middleware/owner");
const isAdmin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/user/:id", [auth], (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(400).send("Invalid Id");

  Follow.find({ idUserRef: new ObjectId(req.params.id) })
    .populate("idPostRef")
    .select("-__v")
    .then((result) => {
      if (!result) return res.status(400).send("Invalid Id");

      res.send(result);
    });
});

module.exports = router;
