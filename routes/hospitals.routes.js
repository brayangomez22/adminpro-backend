const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getHospitals, createHospital } = require('../controllers/hospitals.controller');

const router = Router();

router.get('/', validateJWT, getHospitals);
router.post('/', [validateJWT, check('name', 'The name is required').not().isEmpty(), validateFields], createHospital);
// router.put('/:id', []);
// router.delete('/:id', validateJWT);

module.exports = router;
