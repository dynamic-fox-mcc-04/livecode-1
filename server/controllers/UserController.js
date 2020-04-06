const { User } = require('../models');
const { decrypt } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body;
        const created = {
            email,
            password
        }
        User.findOne({
            where: {
                email
            }
        })
            .then(foundUser => {
                if(foundUser) {
                    return next({
                        name: 'Forbidden',
                        errors: { message: 'Email already exists' }
                    })
                } else {
                    return User.create(created)
                }
            })
            .then(result => {
                console.log(result)
                return res.status(201).json({
                    id: result.dataValues.id,
                    email: result.dataValues.email
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: {
                email : email
            }
        })
            .then(foundUser => {
                const payload = {
                    id: foundUser.dataValues.id,
                    email: foundUser.dataValues.email
                }
                    const access_token = generateToken(payload);
                    console.log(password)
                    let verify = decrypt(password, foundUser.password)
                    if(verify == true) {
                        return res.status(200).json({
                            access_token
                        })
                    }
            })
            .catch(err => {
                return next({
                    name: 'NotFound',
                    errors : { message: 'User Not Found' }
                })
            })
    }
}

module.exports = UserController;