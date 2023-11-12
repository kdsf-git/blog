const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const am = require('../models/authManager.js');

// Register Page
router.get('/', (req, res) => {
	const error = req.query.error;
	am.getUserFromSession(req.session).then(username => {
		if(username) {
			res.redirect("/user/" + username);
		} else {
			res.render('register', { error });
		}
	});
});

// Handle Registration (form submission)
router.post('/', bodyParser.urlencoded(), (req, res) => {
	const { email, password, username } = req.body;
	am.getUserFromSession(req.session).then(un => {
		if(un) {
			res.redirect("/user/" + un);
		} else {
			am.register(email, password, username).then(sid => {
				if(sid) {
					req.session.sessionId = sid;
					res.redirect("/");
				} else {
					res.redirect("/register?error=1");
				}
			});
		}
	});
});

module.exports = router;
