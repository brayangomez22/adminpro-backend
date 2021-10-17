const { request, response } = require('express');
const Hospital = require('../models/hospital.model');
const { generateJWT } = require('../helpers/jwt');

const getHospitals = async (req = request, res = response) => {
	const hospitals = await Hospital.find();

	res.json({
		ok: true,
		hospitals,
	});
};

const createHospital = async (req = request, res = response) => {
	try {
		const uid = req.uid;
		const hospital = new Hospital({ user: uid, ...req.body });

		const hospitalSaved = await hospital.save();

		res.json({
			ok: true,
			hospitalSaved,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Unexpected error...',
		});
	}
};

module.exports = {
	getHospitals,
	createHospital,
};
