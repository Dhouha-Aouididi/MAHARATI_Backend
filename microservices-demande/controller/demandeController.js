const Demande = require('../model/demande');

exports.createDemande = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded!' });
  }

  const image = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;

  Demande.create({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
    image: image
  })
    .then(demande => {
      res.status(201).json({
        message: 'Demande created successfully!',
        demandeCreated: {
          id: demande.id,
          username: demande.username,
          email: demande.email,
          phone: demande.phone,
          subject: demande.subject,
          message: demande.message,
          image: demande.image
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the demande.' });
    });
};

exports.getAllDemandes = (req, res, next) => {
  Demande.findAll()
    .then(demandes => {
      res.status(200).json({
        message: 'Demandes retrieved successfully!',
        demandes
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getDemandeById = (req, res, next) => {
  const { id } = req.params;

  Demande.findByPk(id)
    .then(demande => {
      if (demande) {
        res.status(200).json(demande);
      } else {
        res.status(404).json({ message: 'Demande not found!' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.updateDemande = (req, res, next) => {
  const { id } = req.params;

  Demande.findByPk(id)
    .then(demande => {
      if (!demande) {
        return res.status(404).json({ message: 'Demande not found!' });
      }

      // Update the demande with new values
      demande.username = req.body.username || demande.username;
      demande.email = req.body.email || demande.email;
      demande.phone = req.body.phone || demande.phone;
      demande.subject = req.body.subject || demande.subject;
      demande.message = req.body.message || demande.message;

      // Check if there's a new image uploaded
      if (req.file) {
        const image = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;
        demande.image = image;
      }

      // Save the updated demande
      demande.save()
        .then(updatedDemande => {
          res.status(200).json({
            message: 'Demande updated successfully!',
            updatedDemande
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error updating demande' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.deleteAllDemandes = (req, res, next) => {
  Demande.destroy({ where: {}, truncate: false })
    .then(() => {
      res.status(200).json({ message: 'All demandes deleted successfully!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting all demandes' });
    });
};

exports.deleteDemande = (req, res, next) => {
  const { id } = req.params;

  Demande.findByPk(id)
    .then(demande => {
      if (!demande) {
        return res.status(404).json({ message: 'Demande not found!' });
      }

      // Delete the demande
      demande.destroy()
        .then(() => {
          res.status(200).json({ message: 'Demande deleted successfully!' });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error deleting demande' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
