const express = require('express');
const router = express.Router();
const am = require('../models/authManager.js');
const User = require('../models/user.js');

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
		getUser(user).then(u => {
			if(u) {
				getPostsByUser(user).then(posts => {
					if(user == req.params.username) {
						//editable version
						res.render('profile-we', { user, u, posts });
					} else {
						//read-only version
						res.render('profile-ro', { user, u, posts });
					}
				}
			} else {
				res.status(404).send("User not found");
			}
		}
	});
});

module.exports = router;
