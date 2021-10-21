const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { updateImage } = require('../helpers/updateImage');

const fileUpload = async (req = request, res = response) => {
	const type = req.params.type;
	const id = req.params.id;

	const validTypes = ['hospitals', 'doctors', 'users'];

	if (!validTypes.includes(type)) {
		return res.status(400).json({
			ok: false,
			msg: 'You are not a doctor, user or hospital',
		});
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg: 'No files were uploaded.',
		});
	}

	const file = req.files.img;
	const nameCut = file.name.split('.');
	const fileExtension = nameCut[nameCut.length - 1];

	const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

	if (!validExtensions.includes(fileExtension)) {
		return res.status(400).json({
			ok: false,
			msg: 'It is not a valid extension',
		});
	}

	const nameFile = `${uuidv4()}.${fileExtension}`;
	const path = `./uploads/${type}/${nameFile}`;

	// Use the mv() method to place the file somewhere on your server
	file.mv(path, (err) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				msg: 'Failed to move image',
				err,
			});
		}

		updateImage(type, id, nameFile);

		res.json({
			ok: true,
			msg: 'File uploaded!',
			nameFile,
		});
	});
};

const getImage = async (req = request, res = response) => {
	const type = req.params.type;
	const photo = req.params.photo;

	const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

	if (fs.existsSync(pathImg)) {
		res.sendFile(pathImg);
	} else {
		const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
		res.sendFile(pathImg);
	}
};

module.exports = {
	fileUpload,
	getImage,
};
