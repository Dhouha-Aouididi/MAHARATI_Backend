const Sequelize = require('sequelize');
const UserModel = require('./user');
const ServiceModel = require('./service');
const BookingModel = require('./booking');

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize('testdb', 'root', '0000', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define your models and their associations
const models = {
  User: UserModel(sequelize, Sequelize),
  Service: ServiceModel(sequelize, Sequelize),
  Booking: BookingModel(sequelize, Sequelize),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export the Sequelize instance and models
module.exports = { sequelize, models };
