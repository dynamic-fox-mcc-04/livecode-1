'use strict';
const { encrypt } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'Email already registered'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4],
          msg: 'Password length must be at least 4 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        User.password = encrypt(User.password)
      }
    },
    sequelize,
    modelName: 'User'
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food, { foreignKey: 'UserId', targetKey: 'id'})
  };
  return User;
};