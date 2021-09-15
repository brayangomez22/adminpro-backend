const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		const userDB = await User.findOne({ email });

		if (!userDB) {
			res.status(404).json({
				ok: false,
				msg: 'Invalid email',
			});
		}

		const validPassword = bcrypt.compareSync(password, userDB.password);

		if (!validPassword) {
			res.status(400).json({
				ok: false,
				msg: 'Invalid password',
			});
		}

		res.json({
			ok: true,
			msg: 'Login',
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Unexpected error...',
		});
	}
};

module.exports = {
	login,
};
