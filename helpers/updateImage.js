const fs = require('fs');

const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const deleteImage = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};

const updateImage = async (type, id, nameFile) => {
	switch (type) {
		case 'doctors':
			const doctor = await Doctor.findById(id);
			if (!doctor) {
				return false;
			}

			const pathDoctor = `./uploads/doctors/${doctor.img}`;
			deleteImage(pathDoctor);

			doctor.img = nameFile;
			await doctor.save();
			return true;
			break;

		case 'hospitals':
			const hospital = await Hospital.findById(id);
			if (!hospital) {
				return false;
			}

			const pathHospital = `./uploads/hospitals/${hospital.img}`;
			deleteImage(pathHospital);

			hospital.img = nameFile;
			await hospital.save();
			return true;
			break;

		case 'users':
			const user = await User.findById(id);
			if (!user) {
				return false;
			}

			const pathUser = `./uploads/users/${user.img}`;
			deleteImage(pathUser);

			user.img = nameFile;
			await user.save();
			return true;
			break;

		default:
	}
};

module.exports = {
	updateImage,
};
