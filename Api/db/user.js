module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      name: DataTypes.STRING, 
      email: {
          type: DataTypes.STRING,
          validate: {
              isEmail: true
          }
      }, 
      password: DataTypes.STRING
    });

    return User;
  };