const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest:'public/' });
const demandeController = require('../controller/demandeController');

router.post('/create-demande', upload.single('image'), demandeController.createDemande);
router.get('/', demandeController.getAllDemandes);
router.get('/:id', demandeController.getDemandeById);
router.put('/:id', upload.single('image'), demandeController.updateDemande);
router.delete('/:id', demandeController.deleteDemande);
router.delete('/delete-all', demandeController.deleteAllDemandes);
// Update demande ratings by ID
// router.put('/:id/rating', demandeController.rateDemande);

module.exports = router;
