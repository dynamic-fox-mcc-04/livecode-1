const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
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
                    id: payload.id,
                    email: payload.email
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
                    return res.status(400).json({ type: 'Bad Req', msg: 'Wrong email/pass' })
                } else if(!comparePassword(user.password, response.password)) {
                    return res.status(400).json({ type: 'Bad Req', msg: 'Wrong email/pass' })
                } else {
                    let payload = {
                        id: response.id,
                        email: response.email
                    }
                    let token = createToken(payload)
                    return res.status(200).json({
                        access_token: token
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController