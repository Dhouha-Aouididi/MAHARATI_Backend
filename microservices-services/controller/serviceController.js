const Service = require('../model/service');

exports.createService = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded!' });
  }

  const image = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;

  Service.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    availability: req.body.availability || 'available',
    ratings: req.body.ratings || 0.0,
    image: image
  })
    .then(service => {
      res.status(201).json({
        message: 'Service created successfully!',
        serviceCreated: {
          id: service.id,
          title: service.title,
          description: service.description,
          category: service.category,
          price: service.price,
          availability: service.availability,
          ratings: service.ratings,
          image: service.image
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the service.' });
    });
};

exports.getAllServices = (req, res, next) => {
  Service.findAll()
    .then(services => {
      res.status(200).json({
        message: 'Services retrieved successfully!',
        services
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getServiceById = (req, res, next) => {
  const { id } = req.params;

  Service.findByPk(id)
    .then(service => {
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ message: 'Service not found!' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// exports.updateService = (req, res, next) => {
//   const { id } = req.params;

//   Service.findByPk(id)
//     .then(service => {
//       if (!service) {
//         return res.status(404).json({ message: 'Service not found!' });
//       }

//       // Update the service with new values
//       service.title = req.body.title || service.title;
//       service.description = req.body.description || service.description;
//       service.category = req.body.category || service.category;
//       service.price = req.body.price || service.price;
//       service.availability = req.body.availability || service.availability;
//       service.ratings = req.body.ratings || service.ratings;
      
//       // Save the updated service
//       service.save()
//         .then(updatedService => {
//           res.status(200).json({
//             message: 'Service updated successfully!',
//             updatedService
//           });
//         })
//         .catch(err => {
//           console.error(err);
//           res.status(500).json({ error: 'Error updating service' });
//         });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
// };

exports.updateService = (req, res, next) => {
  const { id } = req.params;

  Service.findByPk(id)
    .then(service => {
      if (!service) {
        return res.status(404).json({ message: 'Service not found!' });
      }

      // Update the service with new values
      service.title = req.body.title || service.title;
      service.description = req.body.description || service.description;
      service.category = req.body.category || service.category;
      service.price = req.body.price || service.price;
      service.availability = req.body.availability || service.availability;
      service.ratings = req.body.ratings || service.ratings;

      // Check if there's a new image uploaded
      if (req.file) {
        const image = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;
        service.image = image;
      }

      // Save the updated service
      service.save()
        .then(updatedService => {
          res.status(200).json({
            message: 'Service updated successfully!',
            updatedService
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error updating service' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.deleteAllServices = (req, res, next) => {
  Service.destroy({ where: {}, truncate: false })
    .then(() => {
      res.status(200).json({ message: 'All services deleted successfully!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting all services' });
    });
};



exports.deleteService = (req, res, next) => {
  const { id } = req.params;

  Service.findByPk(id)
    .then(service => {
      if (!service) {
        return res.status(404).json({ message: 'Service not found!' });
      }

      // Delete the service
      service.destroy()
        .then(() => {
          res.status(200).json({ message: 'Service deleted successfully!' });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error deleting service' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.rateService = (req, res, next) => {
  const { id } = req.params;

  Service.findByPk(id)
    .then(service => {
      if (!service) {
        return res.status(404).json({ message: 'Service not found!' });
      }

      // Update the service with new values
      service.title = req.body.title || service.title;
      service.description = req.body.description || service.description;
      service.category = req.body.category || service.category;
      service.price = req.body.price || service.price;
      service.availability = req.body.availability || service.availability;

      // Update ratings only if provided in the request
      if (req.body.ratings !== undefined) {
        service.ratings = req.body.ratings;
      }

      // Save the updated service
      service.save()
        .then(updatedService => {
          res.status(200).json({
            message: 'Service updated successfully!',
            updatedService,
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error updating service' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
