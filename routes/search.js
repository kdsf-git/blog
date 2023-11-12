const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const am = require('../models/authManager.js');

async function searchPosts(query, searchBy, kw, sortBy) {
	
}

// GET route for displaying the search form
router.get('/', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		const query = null;
		const searchBy = null;
		const keywords = null;
		const sortBy = null;
		const order = null;
		const results = null;
		res.render('search', { user, query, searchBy, keywords, sortBy, results });
	});
});

// POST route for handling the search form submission
router.post('/', bodyParser.urlencoded(), (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		const { query, searchBy, keywords, sortBy } = req.body;
		searchPosts(query, searchBy, keywords, sortBy ).then(results => {
			res.render('search', { user, results, query, searchBy, keywords, sortBy });
		});
	});
});

module.exports = router;
