const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

		const token = await generateJWT(userDB.id);

		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Unexpected error...',
		});
	}
};

const googleSignIn = async (req = request, res = response) => {
	const googleToken = req.body.token;

	try {
		let { name, email, picture } = await googleVerify(googleToken);

		const userDB = await User.findOne({ email });
		let user;

		if (!userDB) {
			user = new User({
				name,
				email,
				password: '@@@',
				img: picture,
				google: true,
			});
		} else {
			user = userDB;
			user.google = true;
		}

		await user.save();

		const token = await generateJWT(user.id);

		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		res.status(403).json({
			ok: false,
			msg: 'The token is not correct',
			error: { message: 'Token de google invalido' },
		});
		return;
	}
};

const renewToken = async (req = request, res = response) => {
	const uid = req.uid;

	try {
		const token = await generateJWT(uid);
		const user = await User.findById(uid);

		res.json({
			ok: true,
			token,
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
	login,
	googleSignIn,
	renewToken,
};
