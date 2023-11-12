const express = require('express');
const router = express.Router();
const am = require('../models/authManager.js');

// Register Page
router.get('/', (req, res) => {
	const error = req.query.error;
	am.getUserFromSession(req.session).then(username => {
		if(username) {
			res.redirect("/");
		} else {
			res.render('register', { error });
		}
	});
});

// Handle Registration (form submission)
router.post('/', (req, res) => {
	const { email, password, username } = req.body;
	am.register(email, password, username).then(sid => {
		if(sid) {
			req.session.sessionId = sid;
			res.redirect("/");
		} else {
			res.redirect("/register?error=1");
		}
	});
});

module.exports = router;
