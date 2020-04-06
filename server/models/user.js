'use strict';
const {encryptpass,decryptpass} = require ('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model{}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING

  },{
    sequelize,
    modelName:'User',
    hooks:{
      beforeCreate(user,opt){
        user.password = encryptpass(user.password)
      }
    }
    
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food)
  };
  return User;
};