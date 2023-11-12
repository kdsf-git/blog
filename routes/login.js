const express = require('express');
const bodyParser = require('body-parser');
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
router.post('/', bodyParser.urlencoded(), (req, res) => {
	const { email, password } = req.body;
	am.getUserFromSession(req.session).then(username => {
		if(username) {
			res.redirect('/user/' + username);
		} else {
			am.login(email, password).then(sid => {
				if(sid) {
					req.session.sessionId = sid;
					res.redirect('/');
				} else {
					res.redirect('/login?error=1');
				}
			});
		}
	});
});

module.exports = router;
