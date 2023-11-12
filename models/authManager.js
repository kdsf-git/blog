const { op } = require('sequelize');
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
						[op.gt]: moment().add(1, 'days').toDate()
					}
				}
			});
			let sess = await Session.findOne({
				where: {
					username: '$User.username$',
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
				id: sid
			}
		});
	}
}

module.exports = {login, logout, getUserFromSession};
