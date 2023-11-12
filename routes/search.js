const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const am = require('../models/authManager.js');

async function searchPosts(query, searchBy, kw, sortBy, order) {
	
}

// GET route for displaying the search form
router.get('/', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		const query = null;
		const searchBy = null;
		const keywords = null;
		const sortBy = null;
		const order = null;
		const results = [];
		res.render('search', { user, query, searchBy, keywords, sortBy, order, results });
	});
});

// POST route for handling the search form submission
router.post('/', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		const { query, searchBy, keywords, sortBy, order } = req.body;
		searchPosts(query, searchBy, keywords, sortBy, order).then(results => {
			res.render('search', { results, query, searchBy, keywords, sortBy, order });
		});
	});
});

module.exports = router;
