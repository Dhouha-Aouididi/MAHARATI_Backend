const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest:'public/' });
const serviceController = require('../controller/serviceController');

router.post('/create-service', upload.single('image'), serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.delete('/delete-all', serviceController.deleteAllServices);
// Update service ratings by ID
// router.put('/:id/rating', serviceController.rateService); 

module.exports = router;
