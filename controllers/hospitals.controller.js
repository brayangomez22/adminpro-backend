const { request, response } = require('express');
const Hospital = require('../models/hospital.model');
const { generateJWT } = require('../helpers/jwt');

const getHospitals = async (req = request, res = response) => {
	const hospitals = await Hospital.find().populate('user', 'name img');

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

const editHospital = async (req = request, res = response) => {
	const id = req.params.id;
	const uid = req.id;

	try {
		const hospitalDB = await Hospital.findById(id);

		if (!hospitalDB) {
			return res.status(404).json({
				ok: false,
				msg: 'The hospital does not exist in the database',
			});
		}

		const changesHospital = { ...req.body, user: uid };

		const updatedHospital = await Hospital.findByIdAndUpdate(id, changesHospital, { new: true });

		res.json({
			ok: true,
			hospital: updatedHospital,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Unexpected error...',
		});
	}
};

const deleteHospital = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const hospitalDB = await Hospital.findById(id);

		if (!hospitalDB) {
			return res.status(404).json({
				ok: false,
				msg: 'The hospital does not exist in the database',
			});
		}

		await Hospital.findByIdAndDelete(id);

		res.json({
			ok: true,
			msg: 'Hospital Deleted',
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
	editHospital,
	deleteHospital,
};
