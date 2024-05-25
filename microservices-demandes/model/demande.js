const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Demande = sequelize.define('Demande', {
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
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

module.exports = Demande;
