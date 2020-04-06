'use strict';
module.exports = (sequelize, DataTypes) => {
  class Food extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }
    get title() {
      return this.title
    }
    get price() {
      return this.price
    }
    get ingredients() {
      return this.ingredients
    }
    get tag() {
      return this.tag
    }
    get userId() {
      return this.userId
    }
  }

  Food.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food'
  })
  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Food;
};