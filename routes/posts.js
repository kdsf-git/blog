const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assuming you have a Post model

// List all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('index', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Display a specific blog post
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

// Create a new blog post (form submission)
router.post('/create', async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const newPost = new Post({ title, content, tags, author: req.user.id }); // Assuming user is authenticated
        await newPost.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Update an existing blog post (form submission)
router.post('/:postId/edit', async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.postId, { title, content, tags }, { new: true });
        res.redirect(`/posts/${post._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a blog post
router.post('/:postId/delete', async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.postId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;