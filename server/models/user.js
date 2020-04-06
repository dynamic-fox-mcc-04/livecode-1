'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    // attributes
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "please input your email address"
        }
      },
      unique: {
        args: true,
        msg: "email already in use!"
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: "min. password 5 character"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user'
    // options
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};