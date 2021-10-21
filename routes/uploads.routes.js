const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload } = require('../controllers/uploads.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validateJWT, fileUpload);

module.exports = router;
