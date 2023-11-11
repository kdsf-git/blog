const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

function getPostsByDate() {
	return Post.findAll({
		order: [
			['date', 'DESC']
		]
	});
}

// Routes
router.get('/', (req, res) => {
    res.render('index', { getPostsByDate(); });
});

// Start the server
module.exports = router;
