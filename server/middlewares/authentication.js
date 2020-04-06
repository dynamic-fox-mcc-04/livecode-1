const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.access_token)
        User.findOne({ where: { id: decoded.id }})
            .then(response => {
                if(response) {
                    req.user = {
                        id: response.id,
                        email: response.email
                    }
                    next()
                } else {
                    return res.status(404).json({ type: '404 Not found', msg: 'User authentication failed'})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    catch {
        return res.status(500).json(err)
    }
}

module.exports = authentication