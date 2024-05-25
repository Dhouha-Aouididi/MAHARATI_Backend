const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/i, // Format HH:MM 24-hour format
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  });

  Booking.associate = (models) => {
    const { User, Service } = models;
    Booking.belongsTo(User, { foreignKey: 'user_id' });
    Booking.belongsTo(Service, { foreignKey: 'service_id' });
  };

  return Booking;
};
