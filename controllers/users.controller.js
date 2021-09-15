const User = require('../models/user.model');

const getUsers = async (req, res) => {
	const users = await User.find();

	res.json({
		ok: true,
		users,
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
