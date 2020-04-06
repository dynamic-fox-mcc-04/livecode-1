'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize

  class Food extends Model{}
  
  Food.init ({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg: 'please fill the blank'
        },
        notEmpty:{
          args:true,
          msg:'please fill the blank'
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg: 'please fill the blank'
        },
        notEmpty:{
          args:true,
          msg:'please fill the blank'
        }
      }
  },
    ingredients: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg: 'please fill the blank'
        },
        notEmpty:{
          args:true,
          msg:'please fill the blank'
        }
      }
    },
    tag: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg: 'please fill the blank'
        },
        notEmpty:{
          args:true,
          msg:'please fill the blank'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  })
  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsTo(models.User)
  };
  return Food;
};