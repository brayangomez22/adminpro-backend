const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// router.get('/', validateJWT, getUsers);
// router.post('/', [], createUser);
// router.put('/:id', [], editUser);
// router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
