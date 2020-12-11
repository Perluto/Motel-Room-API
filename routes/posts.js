const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', async (req, res) =>{
    try {
        const post= await Post.find();
        res.json(post);
    } catch (err)   {
        res.json({message : err});
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        view: req.body.view,
        like: req.body.like
    });

    post.save()
        .then(data =>{
            res.json(data);
        })
        .catch(err =>{
            res.json({message : err});
        });
});

module.exports = router;