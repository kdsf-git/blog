const express = require('express');
const router = express.Router();
const moment = require('moment');
const bodyParser = require('body-parser');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const Kudos = require('../models/kudos.js');
const am = require('../models/authManager.js');
const sequelize = require('../models/dbConnector.js');

async function getPostAndView(pid) {
	return await sequelize.transaction(async () => {
		let p = await Post.findOne({
			where: {
				id: pid
			}
		});
		if(p) {
			p.views = p.views + 1;
			p.save();
			return p;
		} else {
			return null;
		}
	});
}

async function getPost(pid) {
	return await Post.findOne({
		where: {
			id: pid
		}
	});
}

async function modifyPost(pid, tit, cont, kw) {
	return await sequelize.transaction(async () => {
		let post = await getPost(pid);
		post.set({
			title: tit,
			content: cont,
			keywords: kw
		});
		await post.save();
		return post;
	});
}

async function getComments(pid) {
	return await Comment.findAll({
		where: {
			post: pid
		},
		order: [
			[ 'date', 'ASC' ]
		]
	});
}

async function postComment(pid, un, c) {
	return await Comment.create({
		post: pid,
		username: un,
		content: c,
		date: moment().toDate()
	});
}

async function getKudos(un, pid) {
	return await Kudos.findOne({
		where: {
			username: un,
			post: pid
		}
	});
}

async function getNKudos(pid) {
	const kudos = await Kudos.findAll({
		where: {
			post: pid
		}
	});
	return kudos.length;
}

async function toggleKudos(un, pid) {
	return await sequelize.transaction(async () => {
		const kudos = await getKudos(un, pid);
		if(kudos) {
			await kudos.destroy();
		} else {
			await Kudos.create({
				username: un,
				post: pid
			});
		}
	});
}
async function destroyPost(pid) {
	return await sequelize.transaction(async () => {
		await Post.destroy({
			where: {
				id: pid
			}
		});
		await Comment.destroy({
			where: {
				post: pid
			}
		});
		await Kudos.destroy({
			where: {
				post: pid
			}
		});
	});
}

async function createPost(un, tit, cont, kw) {
	return await Post.create({
		username: un,
		title: tit,
		content: cont,
		keywords: kw,
		views: 0,
		date: moment().toDate()
	});
}

router.get('/new', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			res.render("create-post", { user });
		} else {
			res.redirect("/");
		}
	});
});

// Create a new blog post (form submission)
router.post('/new', bodyParser.urlencoded(), (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			const { title, content, keywords } = req.body;
			createPost(user, title, content, keywords).then(post => {
				res.redirect("/post/" + post.id);
			});
		} else {
			res.redirect("/");
		}
	});
});

// Display a specific blog post
router.get('/:postId', (req, res) => {
	getPostAndView(req.params.postId).then(post => {
		if(post) {
			getComments(req.params.postId).then(comments => {
				am.getUserFromSession(req.session).then(user => {
					getKudos(user, req.params.postId).then(kudos => {
						getNKudos(req.params.postId).then(nKudos => {
							res.render('single-post', { user, post, comments, kudos, nKudos });
						});
					});
				});
			});
		} else {
			res.status(404).send("Post not found");
		}
	});
});

router.get('/:postId/edit', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			getPost(req.params.postId).then(post => {
				if(post) {
					if(user == post.username) {
						res.render("edit-post", { user, post });
					} else {
						res.status(402).send("Forbidden");
					}
				} else {
					res.status(404).send("Post not found");
				}
			});
		} else {
			res.redirect("/post/" + req.params.postId);
		}
	});
});

// Update an existing blog post (form submission)
router.post('/:postId/edit', bodyParser.urlencoded(), (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			getPost(req.params.postId).then(post => {
				if(post) {
					if(user == post.username) {
						const { title, content, keywords } = req.body;
						modifyPost(post.id, title, content, keywords).then(() => {
							res.redirect("/post/" + req.params.postId);
						});
					} else {
						res.status(402).send("Forbidden");
					}
				} else {
					res.status(404).send("Post not found");
				}
			});
		} else {
			res.redirect("/post/" + req.params.postId);
		}
	});
});

// Delete a blog post
router.post('/:postId/delete', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			getPost(req.params.postId).then(post => {
				if(post) {
					if(user == post.username) {
						destroyPost(req.params.postId).then(() => {
							res.redirect("/");
						});
					} else {
						res.status(402).send("Forbidden");
					}
				} else {
					res.status(404).send("Post not found");
				}
			});
		} else {
			res.redirect("/post/" + req.params.postId);
		}
	});
});

router.post('/:postId/kudos', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			getPost(req.params.postId).then(post => {
				if(post) {
					toggleKudos(user, req.params.postId).then(() => {
						res.redirect("/post/" + req.params.postId);
					});
				} else {
					res.status(404).send("Post not found");
				}
			});
		} else {
			res.redirect("/post/" + req.params.postId);
		}
	});
});

router.post('/:postId/comment', bodyParser.urlencoded(), (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			getPost(req.params.postId).then(post => {
				if(post) {
					postComment(post.id, user, req.body.content).then(() => {
						res.redirect("/post/" + req.params.postId);
					});
				} else {
					res.status(404).send("Post not found");
				}
			});
		} else {
			res.redirect('/post/' + req.params.postId);
		}
	});
});

module.exports = router;
