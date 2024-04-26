const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  availability: {
    type: DataTypes.ENUM('available', 'not_available'),
    defaultValue: 'available',
  },
  ratings: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true, 
    defaultValue: 0, 
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

module.exports = Service;
