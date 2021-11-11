const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'There is no token in the request',
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.JWT_SECRET);
		req.uid = uid;
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid token',
		});
	}
};

const validateAdminRole = async (req = request, res = response, next) => {
	const uid = req.uid;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			return res.status(404).json({
				ok: false,
				msg: 'Username does not exist',
			});
		}

		if (userDB.role !== 'ADMIN_ROLE') {
			return res.status(403).json({
				ok: false,
				msg: 'You have no privilege to do that',
			});
		}

		next();
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'Talk to the administrator',
		});
	}
};

const validateAdminRoleOrSameUser = async (req = request, res = response, next) => {
	const uid = req.uid;
	const id = req.params.id;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			return res.status(404).json({
				ok: false,
				msg: 'Username does not exist',
			});
		}

		if (userDB.role !== 'ADMIN_ROLE' && uid !== id) {
			return res.status(403).json({
				ok: false,
				msg: 'You have no privilege to do that',
			});
		}

		next();
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'Talk to the administrator',
		});
	}
};

module.exports = {
	validateJWT,
	validateAdminRole,
	validateAdminRoleOrSameUser,
};
