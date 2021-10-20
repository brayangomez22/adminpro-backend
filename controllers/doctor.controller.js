const { request, response } = require('express');
const Doctor = require('../models/doctor.model');

const getDoctors = async (req = request, res = response) => {
	const doctors = await Doctor.find().populate('user', 'name img').populate('hospital', 'name img');

	res.json({
		ok: true,
		doctors,
	});
};

const createDoctor = async (req = request, res = response) => {
	try {
		const uid = req.uid;
		const doctor = new Doctor({ user: uid, ...req.body });

		const doctorSaved = await doctor.save();

		res.json({
			ok: true,
			doctorSaved,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Unexpected error...',
		});
	}
};

module.exports = {
	getDoctors,
	createDoctor,
};
