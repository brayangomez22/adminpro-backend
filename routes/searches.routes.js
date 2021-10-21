const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { getAll } = require('../controllers/searches.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:search', validateJWT, getAll);

module.exports = router;
