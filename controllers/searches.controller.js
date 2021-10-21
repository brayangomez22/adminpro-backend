const { request, response } = require('express');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const getAll = async (req = request, res = response) => {
	const search = req.params.search;
	const regex = new RegExp(search, 'i');

	const [users, hospitals, doctors] = await Promise.all([User.find({ name: regex }), Hospital.find({ name: regex }), Doctor.find({ name: regex })]);

	res.json({
		ok: true,
		users,
		hospitals,
		doctors,
	});
};

const getDocumentsCollection = async (req = request, res = response) => {
	const table = req.params.table;
	const search = req.params.search;
	const regex = new RegExp(search, 'i');

	let data = [];

	switch (table) {
		case 'doctors':
			data = await Doctor.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name img');
			break;

		case 'hospitals':
			data = await Hospital.find({ name: regex }).populate('user', 'name img');
			break;

		case 'users':
			data = await User.find({ name: regex });
			break;

		default:
			return res.status(400).json({
				ok: false,
				msg: 'The table has to be doctors / hospitals / users',
			});
	}

	res.status(200).json({
		ok: true,
		results: data,
	});
};

module.exports = {
	getAll,
	getDocumentsCollection,
};
