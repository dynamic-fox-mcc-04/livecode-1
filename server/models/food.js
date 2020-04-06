'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Food extends Model {

  }

  Food.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Your Title"
        },
        isEmpty: {
          args: true,
          msg: "Title cannot be Empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Your Price"
        },
        isEmpty: {
          args: true,
          msg: "Price cannot be Empty"
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Your Ingredients"
        },
        isEmpty: {
          args: true,
          msg: "Ingredients cannot be Empty"
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Your Tag"
        },
        isEmpty: {
          args: true,
          msg: "Tag cannot be Empty"
        }
      }
    }
  }, {
      sequelize,
      modelName: "User"
      } 
  )

  Food.associate = function(models) {
    Food.belongsTo(models.User)
  };
  return Food;
};