'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  const { encryptPass } = require('../helpers/bcrypt')

  class User extends Model {

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email Already Exists"
      },
      validate: {
        notNull: {
          msg: "Please Enter Your Email"
        },
        isEmail: {
          args: true,
          msg: "Please Input Valid Email"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be Empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Your Password"
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be Empty"
        }
      }
    }
  }, {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, options) {
          user.password = encryptPass(user.password)
        }
      }
      } 
  )

  User.associate = function(models) {
    User.hasMany(models.Food)
  };
  return User;
};