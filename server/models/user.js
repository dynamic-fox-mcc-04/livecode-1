'use strict';
const {encryptPassword} = require("../helper/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },{
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate(user, option) {
        user.password = encryptPassword(user.password)
      }
    }
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food, {foreignKey: "UserId"})
  };
  return User;
};