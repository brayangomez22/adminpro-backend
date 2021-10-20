const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getDoctors, createDoctor } = require('../controllers/doctor.controller');

const router = Router();

router.get('/', validateJWT, getDoctors);
router.post(
	'/',
	[validateJWT, check('name', 'The name is required').not().isEmpty(), check('hospital', 'The hospital id must be valid').isMongoId(), validateFields],
	createDoctor
);
// router.put('/:id', [], editUser);
// router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
