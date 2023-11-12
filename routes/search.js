const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const sequelize = require('../models/dbConnector.js');
const { Op } = require('sequelize');
const am = require('../models/authManager.js');
const Post = require('../models/post.js');
const Kudos = require('../models/kudos.js');

async function searchPosts(query, searchBy, kw, sortBy) {
	
	let q = {
		attributes: [
			'id',
			'title',
			'username',
			'keywords',
			'content',
			'views',
			'date',
			[ sequelize.fn('COUNT', sequelize.col('Kudos.id')), 'nKudos' ]
		],
		include: [
			{
				model: Kudos,
				attributes: []
			}
		],
		group: [ 'Post.id' ],
		raw: true
	};

	switch(searchBy) {
		case 'title':
			q.where = {
				title: { [Op.like]: "%"+query+"%" }
			};
			break;
		case 'author':
			q.where = {
				username: { [Op.like]:"%"+ query+"%" }
			};
			break;
	}

	if(kw) {
		q.where.keywords = { [Op.like]: "%"+kw+"%" };
	}

	switch(sortBy) {
		case 'dateAsc':
			q.order = [['date', 'ASC']];
			break;
		case 'dateDesc':
			q.order = [['date', 'DESC']];
			break;
		case 'kudosAsc':
			q.order = [['nKudos', 'ASC']];
			break;
		case 'kudosDesc':
			q.order = [['nKudos', 'DESC']];
			break;
	}

	console.log(q);

	console.log(await Post.findAll(q));
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
