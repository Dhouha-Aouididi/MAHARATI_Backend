const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  // address: {
  //   type: DataTypes.STRING(255),
  //   allowNull: false,
  // },
  services_offered: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ratings: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    defaultValue: 0.0,
  },
  availability: {
    type: DataTypes.ENUM('available', 'busy'),
    defaultValue: 'available',
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

module.exports = Provider;
