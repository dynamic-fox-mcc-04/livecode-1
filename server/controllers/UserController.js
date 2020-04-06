const { User } = require('../models')
const { decryptPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(result => {
                if (result) {
                    if (decryptPassword(password, result.password)) {
                        let payload = { email: result.email, id: result.id }
                        let token = generateToken(payload)
                        res.status(200).json({ token, id: result.id, email: result.email })
                    } else {
                        next({ status: 404, msg: 'email/password not found' })
                    }
                } else {
                    next({ status: 404, msg: 'email/password not found' })
                }
            })
            .catch(next)
    }
}

module.exports = UserController