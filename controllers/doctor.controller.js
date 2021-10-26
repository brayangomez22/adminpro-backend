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

const editDoctor = async (req = request, res = response) => {
	const id = req.params.id;
	const uid = req.id;

	try {
		const doctorDB = await Doctor.findById(id);

		if (!doctorDB) {
			return res.status(404).json({
				ok: false,
				msg: 'The doctor does not exist in the database',
			});
		}

		const changesDoctor = { ...req.body, user: uid };

		const updatedDoctor = await Doctor.findByIdAndUpdate(id, changesDoctor, { new: true });

		res.json({
			ok: true,
			doctor: updatedDoctor,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Unexpected error...',
		});
	}
};

const deleteDoctor = async (req = request, res = response) => {
	const id = req.params.id;

	try {
		const doctorDB = await Doctor.findById(id);

		if (!doctorDB) {
			return res.status(404).json({
				ok: false,
				msg: 'The doctor does not exist in the database',
			});
		}

		await Doctor.findByIdAndDelete(id);

		res.json({
			ok: true,
			msg: 'Doctor Deleted',
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
	editDoctor,
	deleteDoctor,
};
