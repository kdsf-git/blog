const express = require('express');
const router = express.Router();
const am = require('../models/authManager.js');

router.get('/', (req, res) => {
	am.logout(req.session).then(() => {
		res.redirect("/");
	});
});

module.exports = router;
