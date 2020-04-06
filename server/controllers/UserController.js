const models = require('../models')

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        const data = { email, password }
        return models.User.findOne({ where: { email: email } })
    }
}