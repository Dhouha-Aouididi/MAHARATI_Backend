const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'root', '0000', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging SQL queries
});

module.exports = sequelize;
