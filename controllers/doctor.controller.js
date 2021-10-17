const { request, response } = require('express');
const Doctors = require('../models/doctors.model');

const getDoctors = async (req = request, res = response) => {
	const doctors = await Doctors.find();

	res.json({
		ok: true,
		doctors,
	});
};

module.exports = {
	getDoctors,
};
