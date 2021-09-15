const { request, response } = require('express');
const { validationResult } = require('express-validator');

const User = require('../models/user.model');

const getUsers = async (req, res) => {
	const users = await User.find();

	res.json({
		ok: true,
		users,
	});
};

const createUser = async (req = request, res = response) => {
	const { name, email, password } = req.body;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: errors.mapped(),
		});
	}

	try {
		const emailExists = await User.findOne({ email });

		if (emailExists) {
			return res.status(400).json({
				ok: false,
				msg: 'The email is already registered',
			});
		}

		const user = new User(req.body);

		await user.save();

		res.json({
			ok: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Unexpected error...',
		});
	}
};

module.exports = {
	getUsers,
	createUser,
};
