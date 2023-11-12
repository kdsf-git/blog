const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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
				const error = req.query.error;
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

router.post("/:username", bodyParser.urlencoded(), (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			if(user == req.params.username) {
				const { email, bio, password } = req.body;
				am.modify(user, email, bio, password).then(error => {
					if(error) {
						res.redirect("/user/" + req.params.username + "?error=1");
					} else {
						res.redirect("/user/" + req.params.username);
					}
				});
			} else {
				res.status(502).send("Forbidden");
			}
		} else {
			res.redirect("/user/" + req.params.username + "?error=1");
		}
	});
});

module.exports = router;
