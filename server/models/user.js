'use strict';
const encrypt = require('../helper/encrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    } ,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) =>{
        user.password = encrypt(user.password)
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Food)
    // associations can be defined here
  };
  return User;
};