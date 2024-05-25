const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/' });
const providerController = require('../controller/providerController');

router.post('/create-provider', upload.single('image'), providerController.createProvider);
router.get('/', providerController.getAllProviders);
router.get('/:id', providerController.getProviderById);
router.put('/:id', providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);

module.exports = router;
