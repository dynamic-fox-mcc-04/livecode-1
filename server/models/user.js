'use strict';
module.exports = (sequelize, DataTypes) => {
  
  
  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize
  })
  
  User.associate = function(models) {
    User.hasMany(models.Food)
  };
  return User;
};