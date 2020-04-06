'use strict';
const { encode_password } = require('../helper/bcyript.js')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isUnique(email, done) {
          User.findOne({
            where: {
              email
            }
          })
            .done(result => {
              if (result) {
                return done(new Error('email alerdy in use'))
              }
              return done()
            })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encode_password(user.password);
      }
    },
    sequelize
  })



  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Food)
  };
  return User;
};