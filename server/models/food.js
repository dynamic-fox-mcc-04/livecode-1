'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Food = sequelize.define('Food', {
  //   title: DataTypes.STRING,
  //   price: DataTypes.INTEGER,
  //   ingredients: DataTypes.STRING,
  //   tag: DataTypes.STRING
  // }, {});

  class Food extends sequelize.Sequelize.Model {}

  Food.init({
    // Model attributes are defined here
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ingredients: DataTypes.STRING,
    tag: DataTypes.STRING
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // lastName: {
    //   type: DataTypes.STRING
    //   // allowNull defaults to true
    // }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Food' // We need to choose the model name
  });
  




  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};