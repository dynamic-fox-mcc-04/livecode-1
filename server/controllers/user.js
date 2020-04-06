const { User } = require('../models/index')
const { createToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
            .then(response => {
                let payload = {
                    id: response.id,
                    email: response.email
                }
                let token = createToken(payload)
                return res.status(201).json({
                    email: payload.email,
                    token: token
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static login(req, res, next) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({ where: { email: user.email } })
            .then(response => {
                if(!response) {
                    throw {}
                }
            })
    }
}

module.exports = UserController