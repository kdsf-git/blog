const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

async function getPostsByDate() {
	return await Post.findAll({
		order: [
			['date', 'DESC']
		]
	});
}

// Routes
router.get('/', (req, res) => {
    getPostsByDate().then(posts => {
    	res.render('index', { posts });
    });
});

// Start the server
module.exports = router;
