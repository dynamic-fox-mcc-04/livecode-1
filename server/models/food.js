'use strict';
module.exports = (sequelize, DataTypes) => {
    class Food extends sequelize.Sequelize.Model {}
    Food.init({
        title: DataTypes.STRING,
        price: DataTypes.INTEGER,
        ingredients: DataTypes.STRING,
        tag: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    }, {
        sequelize,
        validate: {
            checkEmpty() {
                if (this.title == '' || this.price == '' || this.ingredients == '' || this.tag == '') {
                    throw new Error(`Please fill all the blank form`)
                }
            }
        },
        modelName: "Food"
    })
    Food.associate = function(models) {
        // associations can be defined here
        Food.belongsTo(models.User, { foreignKey: "UserId" })
    };
    return Food;
};