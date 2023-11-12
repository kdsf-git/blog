const { Op } = require('sequelize');
const moment = require('moment');
const sequelize = require('./dbConnector.js');
const User = require('./user.js');
const Session = require('./session.js');

async function getUserFromSession(session) {
	if(session.sessionId) {
		const sid = session.sessionId;
		return await sequelize.transaction(async () => {
			await Session.destroy({
				where: {
					date: {
						[Op.gt]: moment().add(1, 'days').toDate()
					}
				}
			});
			let sess = await Session.findOne({
				where: {
					id: sid
				},
				include: [{
					model: User,
					required: true
				}]
			});
			if(sess) {
				sess.date = moment().toDate();
				await sess.save();
				return sess.username;
			} else {
				return null;
			}
		});
	} else {
		return null;
	}
}

async function login(em, pw) {
	return await sequelize.transaction(async () => {
		const user = await User.findOne({
			where: {
				email: em,
				password: pw
			}
		});
		if(user) {
			const sess = await Session.create({
				username: user.username,
				date: moment().toDate()
			});
			return sess.id;
		} else {
			return null;
		}
	});
}

async function logout(session) {
	if(session.sessionId) {
		await Session.destroy({
			where: {
				id: session.sessionId
			}
		});
		session.sessionId = null;
		session.destroy();
	}
}

async function register(em, pw, un) {
	return await sequelize.transaction(async () => {
		const user = await User.findOne({
			where: {
				[Op.or]: {
					username: un,
					email: em
				}
			}
		});
		if(user) {
			return null;
		} else {
			await User.create({
				username: un,
				email: em,
				password: pw
			});
			return await login(em, pw);
		}
	});
}

async function modify(un, em, b, pw) {
	return await sequelize.transaction(async () => {
		const existingUser = await User.findOne({
			where: {
				username: {
					[Op.ne]: un
				},
				email: em
			}
		});
		if(existingUser) {
			return 1;
		} else {
			let currentUser = await User.findOne({
				where: {
					username: un
				}
			});
			if(currentUser) {
				currentUser.set({
					email: em,
					bio: b,
					password: pw
				});
				await currentUser.save();
				return null;
			} else {
				return 1;
			}
		}
	});
}

module.exports = {login, logout, register, modify, getUserFromSession};
