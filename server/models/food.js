'use strict';
module.exports = (sequelize, DataTypes) => {
  class Food extends sequelize.Sequelize.Model {}

  Food.init({
    title: { 
      type: DataTypes.STRING,
      len: {
        args: 3,
        msg: 'Title must be at least 3 chars long.'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      len: {
        args: 1,
        msg: 'Price cannot be empty.'
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      len: {
        args: 1,
        msg: 'ingredients cannot be empty.'
      }
    },
    tag: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(food, options) {
        if(!food.tag) {
          food.tag = "ayam" 
        }
        if(!food.UserId) {
          food.UserId = 1
        }
      }
    },
    sequelize
  });
  Food.associate = function(models) {
    Food.belongsTo(models.User)
    // associations can be defined here
  };
  return Food;
};