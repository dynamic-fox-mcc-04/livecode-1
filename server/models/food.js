'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Food = sequelize.define('Food', {
  //   title: DataTypes.STRING,
  //   price: DataTypes.STRING,
  //   ingredients: DataTypes.STRING,
  //   tag: DataTypes.STRING,
  //   UserId: DataTypes.STRING
  // }, {});
  class Food extends sequelize.Sequelize.Model { }
  Food.init({
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    tag: DataTypes.STRING,
    UserId: {
      type: DataTypes.STRING,
      references: sequelize.Sequelize.User
    }
  }, {
    sequelize,
    modelName: 'Food'
  })

  Food.associate = function (models) {
    // associations can be defined here
    Food.belongsTo(models.User)
  };
  return Food;
};