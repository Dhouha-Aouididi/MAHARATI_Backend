const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commentText: DataTypes.TEXT,
    rating: DataTypes.DECIMAL(3, 2),
    // comment_date: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    // },
  });

  Comment.associate = (models) => {
    const { User, Service } = models;
    Comment.belongsTo(User, { foreignKey: 'user_id' });
    Comment.belongsTo(Service, { foreignKey: 'service_id' });
  };

  return Comment;
};
