'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    afterValidate: (user, options) => {
      user.password = 'Toni';
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food)
  };
  return User;
};