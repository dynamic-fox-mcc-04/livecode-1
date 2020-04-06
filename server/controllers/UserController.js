const models = require('../models')
const { generateToken } = require('../helpers/jwt.js')
const { decryptPassword } = require('../helpers/bcrypt.js')

class UserController {
    static register(req, res, next) {
        console.log(`masuk ke register`)
        const { email, password } = req.body
        const data = { email, password }
        console.log(data)
        return models.User.create(data)
            .then(result => {
                console.log(result)
                return res.status(200).json({
                    id: result.id,
                    email: result.email,
                    password: result.password
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next) {
        console.log(`masuk ke login`)
        const { email, password } = req.body
        const data = { email, password }
        console.log(data)
        return models.User.findOne({ where: { email: email } })
            .then(result => {
                if (result) {
                    // let compare = decryptPassword(password, result.password)
                    // if (compare) {
                    let payload = {
                        id: result.id,
                        email: result.email
                    }
                    let token = generateToken(payload)
                    return res.status(200).json({
                            id: payload.id,
                            email: payload.email,
                            token: token
                        })
                        // } else {
                        //     return next({
                        //         name: `BadRequest`,
                        //         errors: [{ message: `Invalid Email/Password` }]
                        //     })
                        // }

                } else {
                    return next({
                        name: `BadRequest`,
                        errors: [{ message: `Invalid Email/Password` }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UserController