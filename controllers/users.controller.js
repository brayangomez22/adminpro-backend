const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const getUsers = async (req, res) => {
	const users = await User.find();

	res.json({
		ok: true,
		users,
	});
};

const createUser = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		const emailExists = await User.findOne({ email });

		if (emailExists) {
			return res.status(400).json({
				ok: false,
				msg: 'The email is already registered',
			});
		}

		const user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

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
