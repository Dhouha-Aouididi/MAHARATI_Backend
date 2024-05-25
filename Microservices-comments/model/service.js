const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    availability: {
      type: DataTypes.ENUM('available', 'not_available'),
      defaultValue: 'available',
    },
    ratings: DataTypes.DECIMAL(3, 2),
    image: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Service;
};
