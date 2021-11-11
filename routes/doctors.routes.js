const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getDoctors, getDoctorsById, createDoctor, editDoctor, deleteDoctor } = require('../controllers/doctor.controller');

const router = Router();

router.get('/', validateJWT, getDoctors);
router.get('/:id', validateJWT, getDoctorsById);
router.post(
	'/',
	[validateJWT, check('name', 'The name is required').not().isEmpty(), check('hospital', 'The hospital id must be valid').isMongoId(), validateFields],
	createDoctor
);
router.put(
	'/:id',
	[validateJWT, check('name', 'The name is required').not().isEmpty(), check('hospital', 'The hospital id must be valid').isMongoId(), validateFields],
	editDoctor
);
router.delete('/:id', validateJWT, deleteDoctor);

module.exports = router;
