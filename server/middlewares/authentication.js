const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)

        User.findByPk(decoded.id)
            .then(user => {
                if (user) {
                    req.logged_user = decoded.id
                    return next()
                } else {
                    return next({ status: 401, msg: 'Authentication Failed' })
                }
            })
            .catch(next)
    } catch (err) {
        return next({ status: 403, msg: 'Login required' })
    }
}

module.exports = { authentication }