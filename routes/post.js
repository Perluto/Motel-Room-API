const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DB = require("../startup/db");
const db = new DB();
const ObjectId = mongoose.Types.ObjectId;
const { Post, validatePost } = require("../models/post/post");
const { Room, validateRoom } = require("../models/room/room");
const { User } = require("../models/user/user");
const { Comment, validateComment } = require("../models/post/comment");
const { Report, validateReport } = require("../models/post/report");

const auth = require("../middleware/auth");
const isOwner = require("../middleware/owner");
const isAdmin = require("../middleware/admin");

router.get("/all", [auth, isAdmin], (req, res) => {
  db.connect();
  Post.find({})
    .select("-__v")
    .then((result) => {
      if (!result)
        return res
          .status(400)
          .send("The post with the given ID was not found.");
      db.disconnect();
      res.send(result);
    });
});

router.get("/:idUser", [auth, isOwner], (req, res) => {
  db.connect();
  Post.find({ idUserRef: new ObjectId(req.params.idUser) })
    .select("-__v")
    .then((result) => {
      if (!result)
        return res
          .status(400)
          .send("The post with the given ID was not found.");
      db.disconnect();
      res.send(result);
    });
});

router.get("/:id", [auth, isOwner], async (req, res) => {
  db.connect();

  const post = await Post.findById(req.params.id).select("-__v");

  db.disconnect();
  if (!post)
    return res.status(400).send("The address with the given ID was not found.");

  res.send(post);
});

router.post("/", [auth, isOwner], async (req, res) => {
  const data = req.body.data;
  const { error } = validatePost(data);

  if (error) return res.status(400).send(error.details[0].message);
  db.connect();

  const room = await Room.findById(data.idRoomRef);
  if (!room) return res.status(400).send("Invalid ID");

  const user = await User.findById(data.idUserRef);
  if (!user) return res.status(400).send("Invalid ID");

  const post = new Post({
    idRoomRef: new ObjectId(data.idRoomRef),
    idUserRef: new ObjectId(data.idUserRef),
    isConfirm: false,
    postedDate: data.postedDate,
  });

  post
    .save()
    .then(() => {
      db.disconnect();
      res.status(200).send("Done");
    })
    .catch(() => {
      res.status(501).send("Failed");
    });
});

router.put("/:id", [auth, isOwner], async (req, res) => {
  db.connect();

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send("Invalid id.");

  const newPost = await Post.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!newPost)
    return res.status(404).send("The post with the given ID was not found.");

  db.disconnect();

  res.send(newPost);
});

/*
router.get("/:idPost/comment/:idCmt", async (req, res) => {
  db.connect();

  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const cmt = await Comment.findById(req.params.idCmt);
  if (!cmt) return res.status(400).send("Invalid id.");

  db.disconnect();
  res.send(cmt);
});
*/

router.get("/:idPost/comment", [auth, isOwner], async (req, res) => {
  db.connect();

  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const idPostRef = new ObjectId(req.params.idPost);
  const cmt = await Comment.find({ idPostRef: idPostRef }).select("-__v");

  db.disconnect();
  res.send(cmt);
});

router.post("/:idPost/comment", [auth], async (req, res) => {
  const data = req.body.data;
  data.idPostRef = req.params.idPost;
  const { error } = validateComment(data);
  if (error) return res.status(400).send(error.details[0].message);

  db.connect();

  const post = await Post.findById(data.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const cmt = new Comment({
    idPostRef: new ObjectId(data.idPost),
    idUserRef: new ObjectId(data.idUserRef),
    content: data.content,
    dateTime: data.dateTime,
  });

  cmt
    .save()
    .then(() => {
      db.disconnect();
      res.status(200).send("Done");
    })
    .catch(() => {
      res.status(501).send("Failed");
    });
});

router.put("/:idPost/comment/:idCmt", [auth, isAdmin], async (req, res) => {
  db.connect();
  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const cmt = await Comment.findById(req.params.idCmt);
  if (!cmt) return res.status(400).send("Invalid id.");

  const newCmt = await Comment.findByIdAndUpdate(
    req.params.idCmt,
    { status: req.body.status },
    { new: true }
  );

  if (!newCmt)
    return res.status(404).send("The post with the given ID was not found.");

  db.disconnect();
  res.send(newCmt);
});

/*
router.get("/:idPost/report/:idRep", async (req, res) => {});
*/

router.get("/:idPost/report", [auth, isAdmin], async (req, res) => {
  db.connect();

  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const idPostRef = new ObjectId(req.params.idPost);
  const report = await Report.find({ idPostRef: idPostRef }).select("-__v");

  db.disconnect();

  res.send(report);
});

router.post("/:idPost/report", [auth], async (req, res) => {
  const data = req.body.data;
  data.idPostRef = req.params.idPost;
  const { error } = validateReport(data);
  if (error) return res.status(400).send(error.details[0].message);
  db.connect();

  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const report = new Report({
    idUserRef: new ObjectId(data.idUserRef),
    idPostRef: new ObjectId(data.idPost),
    reason: data.reason,
  });

  report
    .save()
    .then(() => {
      db.disconnect();
      res.status(200).send("Done");
    })
    .catch(() => {
      res.status(501).send("Failed");
    });
});

router.put("/:idPost/report/:idRep", [auth, isAdmin], async (req, res) => {
  db.connect();

  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const report = await Report.findById(req.params.idRep);
  if (!report) return res.status(400).send("Invalid id.");

  const newReport = await Report.findByIdAndUpdate(
    req.params.idRep,
    { status: req.body.status },
    { new: true }
  );

  if (!newReport)
    return res.status(404).send("The report with the given ID was not found.");

  db.disconnect();
  res.send(newReport);
});

module.exports = router;
