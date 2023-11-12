const express = require('express');
const router = express.Router();
const moment = require('moment');
const bodyParser = require('body-parser');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
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

async function toggleKudos(un, pid) {
	return await sequelize.transaction(async () => {
		const kudos = await Kudos.findOne({
			where: {
				username: un,
				post: pid
			}
		});
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

// Display a specific blog post
router.get('/:postId', (req, res) => {
	getPostAndView(req.params.postId).then(post => {
		if(post) {
			getComments(req.params.postId).then(comments => {
				am.getUserFromSession(req.session).then(user => {
					getKudos(user, req.params.postId).then(kudos => {
						res.render('single-post', { user, post, comments, kudos });
					});
				});
			});
		} else {
			res.status(404).send("Post not found");
		}
	});
});

// Create a new blog post (form submission)
router.post('/create', (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const newPost = new Post({ title, content, tags, author: req.user.id }); // Assuming user is authenticated
        await newPost.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Update an existing blog post (form submission)
router.post('/:postId/edit', (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.postId, { title, content, tags }, { new: true });
        res.redirect(`/posts/${post._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a blog post
router.post('/:postId/delete', (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.postId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:postId/kudos', (req, res) => {
	am.getUserFromSession(req.session).then(user => {
		if(user) {
			getPost(req.params.postId).then(post => {
				if(post) {
					toggleKudos(user.username, req.params.postId).then(() => {
						res.redirect("/" + req.params.postId);
					});
				} else {
					res.status(404).send("Post not found");
				}
			});
		} else {
			res.redirect("/" + req.params.postId);
		}
	});
}

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
