const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const am = require('../models/authManager.js');

router.get('/', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		res.render("search", { user });
    });
});

router.post('/', bodyParser.urlencoded(), (req, res) => {
});

module.exports = router;
