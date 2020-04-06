'use strict';
module.exports = (sequelize, DataTypes) => {
 

  class Food extends sequelize.Sequelize.Model{}

  Food.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ingredients: DataTypes.STRING,
    tag: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }
    ,{
      sequelize,
      modelName:'Food'
    })

  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsTo(models.User)
  };
  return Food;
};