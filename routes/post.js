const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const ObjectId = mongoose.Types.ObjectId;
const { Post, validatePost } = require("../models/post/post");
const { Room, validateRoom } = require("../models/room/room");
const { User } = require("../models/user/user");
const { Like, validateLike } = require("../models/post/like");
const { Follow, validateFollow } = require("../models/post/follow");
const { Comment, validateComment } = require("../models/post/comment");
const { Report, validateReport } = require("../models/post/report");

const auth = require("../middleware/auth");
const isOwner = require("../middleware/owner");
const isAdmin = require("../middleware/admin");

router.get("/all", [auth], (req, res) => {
  Post.find({})
    .populate("idRoomRef")
    .select("-__v")
    .then((result) => {
      if (!result)
        return res
          .status(400)
          .send("The post with the given ID was not found.");

      res.send(result);
    });
});

router.get("/all/confirmed", [auth], (req, res) => {
  Post.find({ isConfirm: true })
    .populate("idRoomRef")
    .select("-__v")
    .then((result) => {
      if (!result)
        return res
          .status(400)
          .send("The post with the given ID was not found.");

      res.send(result);
    });
});

router.get("/owner/:idOwnerRef", [auth, isOwner], (req, res) => {
  Post.find({ idUserRef: new ObjectId(req.params.idOwnerRef) })
    .populate("idRoomRef")
    .select("-__v")
    .then((result) => {
      if (!result)
        return res
          .status(400)
          .send("The post with the given ID was not found.");

      res.send(result);
    });
});

router.get("/:id", [auth, isOwner], async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("idRoomRef")
    .select("-__v");

  if (!post)
    return res.status(400).send("The address with the given ID was not found.");

  res.send(post);
});

router.post("/", [auth, isOwner], async (req, res) => {
  const data = req.body.data;
  const { error } = validatePost(data);

  if (error) return res.status(400).send(error.details[0].message);

  const room = await Room.findById(data.idRoomRef);
  if (!room) return res.status(400).send("Invalid ID");

  const user = await User.findById(data.idUserRef);
  if (!user) return res.status(400).send("Invalid ID");

  const post = new Post({
    idRoomRef: new ObjectId(data.idRoomRef),
    idUserRef: new ObjectId(data.idUserRef),
    postName: data.postName,
    isConfirm: req.body.user.isAdmin,
    postedDate: data.postedDate,
    dueDate: data.dueDate,
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

router.put("/:id", [auth, isAdmin], async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send("Invalid id.");

  const newPost = await Post.findByIdAndUpdate(
    req.params.id,
    { idConfirm: req.body.idConfirm },
    { new: true }
  );

  if (!newPost)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(newPost._id);
});

router.put("/:id/view", [auth], async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send("Invalid id.");

  await Post.findByIdAndUpdate(
    req.params.id,
    { view: post.view + 1 },
    { new: true }
  );

  res.send("Done");
});

router.put("/:id/like", [auth], async (req, res) => {
  const idUserRef = req.body.idUser;
  const { error } = validateLike({
    idUserRef: idUserRef,
    idPostRef: req.params.id,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send("Invalid id.");

  const user = await User.findById(idUserRef);
  if (!user) return res.status(400).send("Invalid id.");

  const like = await Like.findOne({
    idUserRef: new ObjectId(idUserRef),
    idPostRef: new ObjectId(req.params.id),
  });

  const cnt = post.like + like ? -1 : 1;
  const query = Post.findByIdAndUpdate(
    req.params.id,
    { like: cnt > 0 ? cnt : 0 },
    { new: true }
  );

  if (like) {
    Promise.all([Like.findOneAndDelete({ _id: new ObjectId(like._id) }), query])
      .then((result) => {
        res.send("Done");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    const newLike = new Like({
      idUserRef: new ObjectId(idUserRef),
      idPostRef: new ObjectId(req.params.id),
    });
    Promise.all([query, newLike.save()])
      .then((result) => {
        res.send("Done");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});

router.put("/:id/follow", [auth], async (req, res) => {
  const idUserRef = req.body.idUser;
  const { error } = validateFollow({
    idUserRef: idUserRef,
    idPostRef: req.params.id,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send("Invalid id.");

  const user = await User.findById(idUserRef);
  if (!user) return res.status(400).send("Invalid id.");

  const follow = await Follow.findOne({
    idUserRef: new ObjectId(idUserRef),
    idPostRef: new ObjectId(req.params.id),
  });

  const cnt = post.follow + follow ? -1 : 1;
  const query = Post.findByIdAndUpdate(
    req.params.id,
    { follow: cnt > 0 ? cnt : 0 },
    { new: true }
  );

  if (follow) {
    Promise.all([
      Follow.findOneAndDelete({ _id: new ObjectId(follow._id) }),
      query,
    ])
      .then((result) => {
        res.send("Done");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    const newFollow = new Follow({
      idUserRef: new ObjectId(idUserRef),
      idPostRef: new ObjectId(req.params.id),
    });
    Promise.all([query, newFollow.save()])
      .then((result) => {
        res.send("Done");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});

router.get("/:idPost/comment", [auth], async (req, res) => {
  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const idPostRef = new ObjectId(req.params.idPost);
  const cmt = await Comment.find({ idPostRef: idPostRef }).select("-__v");

  res.send(cmt);
});

router.post("/:idPost/comment", [auth], async (req, res) => {
  const data = req.body.data;
  data.idPostRef = req.params.idPost;
  const { error } = validateComment(data);
  if (error) return res.status(400).send(error.details[0].message);

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
      res.status(200).send("Done");
    })
    .catch(() => {
      res.status(501).send("Failed");
    });
});

router.put("/:idPost/comment/:idCmt", [auth, isAdmin], async (req, res) => {
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

  res.send(newCmt);
});

router.get("/:idPost/report", [auth, isAdmin], async (req, res) => {
  const post = await Post.findById(req.params.idPost);
  if (!post) return res.status(400).send("Invalid id.");

  const idPostRef = new ObjectId(req.params.idPost);
  const report = await Report.find({ idPostRef: idPostRef }).select("-__v");

  res.send(report);
});

router.post("/:idPost/report", [auth], async (req, res) => {
  const data = req.body.data;
  data.idPostRef = req.params.idPost;
  const { error } = validateReport(data);
  if (error) return res.status(400).send(error.details[0].message);

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
      res.status(200).send("Done");
    })
    .catch(() => {
      res.status(501).send("Failed");
    });
});

router.put("/:idPost/report/:idRep", [auth, isAdmin], async (req, res) => {
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

  res.send(newReport);
});

module.exports = router;
