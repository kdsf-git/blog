const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comment.js');
const Kudos = require('./kudos.js');
const Session = require('./session.js');

User.hasMany(Post, {
	foreignKey: 'username'
});
User.hasMany(Comment, {
	foreignKey: 'username'
});
User.hasMany(Kudos, {
	foreignKey: 'username'
});
User.hasMany(Session, {
	foreignKey: 'username'
});

Post.hasMany(Comment, {
	foreignKey: 'post'
});
Post.hasMany(Kudos, {
	foreignKey: 'post'
});
Post.belongsTo(User, {
	foreignKey: 'username'
});

Comment.belongsTo(Post, {
	foreignKey: 'post'
});
Comment.belongsTo(User, {
	foreignKey: 'username'
});

Kudos.belongsTo(User, {
	foreignKey: 'username'
});
Kudos.belongsTo(Post, {
	foreignKey: 'post'
});

Session.belongsTo(User, {
	foreignKey: 'username'
});
