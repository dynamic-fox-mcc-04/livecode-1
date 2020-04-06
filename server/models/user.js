'use strict';
const {encrypt} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: 
    {
      type : DataTypes.STRING,
      validate :
      {
        isEmail : {msg : "Input email format"}
      },
      unique : true
    },
    password: DataTypes.STRING
  }, {
    hooks:
    {
      beforeCreate : (user, options) =>
      {
        user.password = encrypt(user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food)
  };
  return User;
};