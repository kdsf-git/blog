const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assuming you have a Post model
const { ensureAuthenticated } = require('../config/auth'); // Middleware for user authentication

// View a specific blog post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('single-post', { post });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Edit a specific blog post (form submission)
router.post('/:postId/edit', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.postId, { title, content, tags }, { new: true });
        res.redirect(`/post/${post._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;