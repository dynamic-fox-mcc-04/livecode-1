'use strict';
module.exports = (sequelize, DataTypes) => {

    const Model = sequelize.Sequelize.Model

    class Food extends Model {

    }

    Food.init({
        title: DataTypes.STRING,
        price: DataTypes.INTEGER,
        ingredients: DataTypes.STRING,
        tag: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, { sequelize });

    Food.associate = function(models) {
        Food.belongsTo(models.User, { foreignKey: userId })
    };
    return Food;
};