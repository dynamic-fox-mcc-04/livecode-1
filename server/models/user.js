'use strict';

const { encryptPassword } = require("../helpers/bcrypt.js")

module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});

  class User extends sequelize.Sequelize.Model {}

  User.init({
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // lastName: {
    //   type: DataTypes.STRING
    //   // allowNull defaults to true
    // }
  }, {
    // Other model options go here
    hooks:{
      beforeCreate: (user, options) => {
        user.password = encryptPassword(user.password)
      }
    },
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });


  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};