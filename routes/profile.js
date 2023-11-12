const express = require('express');
const router = express.Router();
const am = require('../models/authManager.js');
const User = require('../models/user.js');
const Post = require('../models/post.js');

async function getUser(un) {
	return await User.findOne({
		where: {
			username: un
		}
	});
}

async function getPostsByUser(un) {
	return await Post.findAll({
		where: {
			username: un
		}
	});
}

// Profile Page
router.get('/:username', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		getUser(req.params.username).then(u => {
			if(u) {
				const error = null;
				getPostsByUser(u.username).then(posts => {
					if(user == req.params.username) {
						//editable version
						res.render('profile-we', { user, u, posts, error });
					} else {
						//read-only version
						res.render('profile-ro', { user, u, posts, error });
					}
				});
			} else {
				res.status(404).send("User not found");
			}
		});
	});
});

module.exports = router;
