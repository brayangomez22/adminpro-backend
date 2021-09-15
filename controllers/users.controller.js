const getUsers = (req, res) => {
	res.json({
		ok: true,
		msg: 'Hello World',
	});
};

module.exports = {
	getUsers,
};
