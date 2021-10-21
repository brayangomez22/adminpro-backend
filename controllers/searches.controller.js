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

module.exports = {
	getAll,
};
