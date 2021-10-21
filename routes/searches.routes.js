const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { getAll, getDocumentsCollection } = require('../controllers/searches.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:search', validateJWT, getAll);
router.get('/collection/:table/:search', validateJWT, getDocumentsCollection);

module.exports = router;
