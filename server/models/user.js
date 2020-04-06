'use strict';
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