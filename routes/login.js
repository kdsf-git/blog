const express = require('express');
const router = express.Router();
const am = require('../models/authManager.js');

// Login Page
router.get('/', (req, res) => {
    const error = req.query.error;
    am.getUserFromSession(req.session).then(username => {
    	if(username) {
	    res.redirect('/user/' + username);
	} else {
	    res.render('login', { error });
	}
    });
});

// Handle Login (form submission)
router.post('/', (req, res) => {
	const { email, password } = req.body;
	am.login(email, password).then(sid => {
		if(sid) {
			res.session.sessionId = sid;
			res.redirect('/');
		} else {
			res.redirect('/login?error=1');
		}
	});
});

module.exports = router;
