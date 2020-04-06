'use strict';
const { encryptPassword } = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {}
    User.init({
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: `your email format is wrong`
                }
            }
        },
        password: DataTypes.STRING
    }, {
        sequelize,
        // hooks: {
        //     beforeCreate(User, options) {
        //         User.password = encryptPassword(User.password)
        //     }
        // },
        validate: {
            checkEmpty() {
                if (this.email == '' || this.password == '') {
                    throw new Error(`Please fill all the blank form`)
                }
            }
        },
        modelName: "User"
    })
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Food, { foreignKey: "UserId" })
    };
    return User;
};