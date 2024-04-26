const Provider = require('../model/provider');

exports.createProvider = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded!' });
  }

  const image = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;

  Provider.create({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    services_offered: req.body.services_offered || '',
    ratings: req.body.ratings || 0.0,
    availability: req.body.availability || 'available',
    image: image
  })
    .then(provider => {
      res.status(201).json({
        message: 'Provider created successfully!',
        providerCreated: {
          id: provider.id,
          username: provider.username,
          email: provider.email,
          phone: provider.phone,
          services_offered: provider.services_offered,
          ratings: provider.ratings,
          availability: provider.availability,
          image: provider.image
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the provider.' });
    });
};

exports.getAllProviders = (req, res, next) => {
  Provider.findAll()
    .then(providers => {
      res.status(200).json({
        message: 'Providers retrieved successfully!',
        providers
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getProviderById = (req, res, next) => {
  const { id } = req.params;

  Provider.findByPk(id)
    .then(provider => {
      if (provider) {
        res.status(200).json(provider);
      } else {
        res.status(404).json({ message: 'Provider not found!' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.updateProvider = (req, res, next) => {
  const { id } = req.params;

  Provider.findByPk(id)
    .then(provider => {
      if (!provider) {
        return res.status(404).json({ message: 'Provider not found!' });
      }

      // Update the provider with new values
      provider.username = req.body.username || provider.username;
      provider.email = req.body.email || provider.email;
      provider.phone = req.body.phone || provider.phone;
      provider.services_offered = req.body.services_offered || provider.services_offered;
      provider.ratings = req.body.ratings || provider.ratings;
      provider.availability = req.body.availability || provider.availability;

      // Check if there's a new image uploaded
      if (req.file) {
        const image = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;
        provider.image = image;
      }

      // Save the updated provider
      provider.save()
        .then(updatedProvider => {
          res.status(200).json({
            message: 'Provider updated successfully!',
            updatedProvider
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error updating provider' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.deleteAllProviders = (req, res, next) => {
  Provider.destroy({ where: {}, truncate: false })
    .then(() => {
      res.status(200).json({ message: 'All providers deleted successfully!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting all providers' });
    });
};

exports.deleteProvider = (req, res, next) => {
  const { id } = req.params;

  Provider.findByPk(id)
    .then(provider => {
      if (!provider) {
        return res.status(404).json({ message: 'Provider not found!' });
      }

      // Delete the provider
      provider.destroy()
        .then(() => {
          res.status(200).json({ message: 'Provider deleted successfully!' });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error deleting provider' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
