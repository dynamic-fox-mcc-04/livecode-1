'use strict';

const { generatePassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

    const Model = sequelize.Sequelize.Model

    class User extends Model {

    }

    User.init({
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            hooks: {
                beforeCreate: (user, options) => {
                    user.password = generatePassword(password)
                }
            }
        }
    }, { sequelize });

    User.associate = function(models) {
        User.hasMany(models.Food, { foreignKey: userId })
    };
    return User;
};