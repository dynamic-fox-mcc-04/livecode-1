'use strict';
const {encryptPassword}= require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize

  class User extends Model{}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          args: true,
          msg: 'please insert the email'
        },
        notEmpty:{
          args: true,
          msg: 'please insert the email'
        },
        isEmail:{
          args: true,
          msg: 'invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          args: true,
          msg: 'please insert password'
        },
        notEmpty:{
          args: true,
          msg: 'please insert the password'
        }
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate(user, options) {
        user.password= encryptPassword(user.password)
      }
    }
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food)
  };
  return User;
};