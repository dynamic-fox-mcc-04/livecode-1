'use strict';
module.exports = (sequelize, DataTypes) => {
  class Food extends sequelize.Sequelize.Model { }
  Food.init({
    // attributes
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
      // allowNull defaults to true
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    }
  }, {
    sequelize,
    modelName: 'Food'
    // options
  });
  Food.associate = function (models) {
    // associations can be defined here
    Food.belongsTo(models.User)
  };
  return Food;
};