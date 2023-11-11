const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

function getPostsByDate() {
	return await Post.findAll({
		order: [
			['date', 'DESC']
		]
	});
}

// Routes
router.get('/', (req, res) => {
    const posts = getPostsByDate();
    res.render('index', { posts });
});

// Start the server
module.exports = router;
