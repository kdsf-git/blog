const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

function getPostsByDate() {
	let res = [];
	Post.findAll({
		order: [
			['date', 'DESC']
		]
	}).then((result) => {
		res = result;
	});
}

// Routes
router.get('/', (req, res) => {
    const posts = getPostsByDate();
    res.render('index', { posts });
});

// Start the server
module.exports = router;
