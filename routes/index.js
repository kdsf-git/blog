const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const am = require('../models/authManager.js');

async function getPostsByDate() {
	return await Post.findAll({
		order: [
			['date', 'DESC']
		]
	});
}

// Routes
router.get('/', (req, res) => {
    am.getUserFromSession(req.session).then(user => {
        getPostsByDate().then(posts => {
      	    res.render('index', { posts, user });
    	});
    });
});

// Start the server
module.exports = router;
