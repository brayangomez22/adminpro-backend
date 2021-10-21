const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, getImage } = require('../controllers/uploads.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validateJWT, fileUpload);
router.get('/:type/:photo', validateJWT, getImage);

module.exports = router;
