const User = require('../models/user.model');

const getUsers = (req, res) => {
	res.json({
		ok: true,
		msg: 'Get Users',
	});
};

const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	const user = new User(req.body);

	await user.save();

	res.json({
		ok: true,
		user,
	});
};

module.exports = {
	getUsers,
	createUser,
};
