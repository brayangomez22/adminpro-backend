const { request, response } = require('express');

const getAll = async (req = request, res = response) => {
	const search = req.params.search;

	res.json({
		ok: true,
		search,
	});
};

module.exports = {
	getAll,
};
