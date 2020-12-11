const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get("/me", async (req, res) => {
    //const user = await User.findById(req.username._id).select("-password");
    res.send(user);
  });

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save()
        .then(data =>{
            res.json(data);
        })
        .catch(err =>{
            res.json({message : err});
        });
});

module.exports = router;