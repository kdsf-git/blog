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

// GET route for displaying the search form
router.get('/search', (req, res) => {
	// Render the search form view (search.ejs)
	const query = null;
	const searchBy = null;
	const keywords = null;
	const sortBy = null;
	const order = null;
	res.render('search', { query, searchBy, keywords, sortBy, order });
});

// POST route for handling the search form submission
router.post('/search', async (req, res) => {
	try {
		const { query, searchBy, keywords, sortBy, order } = req.body;

		// search using parameters
		const results = await searchPosts(query, searchBy, keywords, sortBy, order);

		// search results view with retrieved results
		res.render('search', { results, query, searchBy, keywords, sortBy, order });
	} catch (error) {
		// Handle errors
		console.error(error);
		res.render('error', { error });
	}
});

module.exports = router;
