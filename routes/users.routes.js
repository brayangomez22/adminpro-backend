const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);
router.post(
	'/',
	[
		check('name', 'The name is required').not().isEmpty(),
		check('email', 'The email is required').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
	],
	createUser
);

module.exports = router;
