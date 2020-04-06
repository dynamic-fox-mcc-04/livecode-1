'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }
    get email() {
      return this.email
    }
    get password() {
      return this.password
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food, { foreignKey: 'userId' })
  };
  return User;
};