module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      profile_image: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
  