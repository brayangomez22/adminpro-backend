const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, createUser, editUser, deleteUser } = require('../controllers/users.controller');
const { validateJWT, validateAdminRole, validateAdminRoleOrSameUser } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);
router.post(
	'/',
	[
		check('name', 'The name is required').not().isEmpty(),
		check('email', 'The email is required').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
		validateFields,
	],
	createUser
);
router.put(
	'/:id',
	[
		validateJWT,
		validateAdminRoleOrSameUser,
		check('name', 'The name is required').not().isEmpty(),
		check('email', 'The email is required').isEmail(),
		check('role', 'The role is required').not().isEmpty(),
		validateFields,
	],
	editUser
);
router.delete('/:id', [validateJWT, validateAdminRole], deleteUser);

module.exports = router;
