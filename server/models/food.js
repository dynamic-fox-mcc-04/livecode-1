'use strict';
module.exports = (sequelize, DataTypes) => {
  class Food extends sequelize.Sequelize.Model {}
  Food.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: 'Food must be at least 3 characters'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Ingredients must be at least 6 characters'
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Food'
  })

  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id'})
  };
  return Food;
};