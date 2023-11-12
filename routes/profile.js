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

// Profile Page
router.get('/:username', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			const u = getUser(user);
			if(user == req.params.username) {
				//editable version
				res.render('profile-we', { user, u });
			} else {
				//read-only version
				res.render('profile-ro', { user, u });
			}
		} else {
			res.status(404).send("User not found");
		}
	});
});

module.exports = router;
