const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication( req, res, next ) {
    try {
        let decoded = verifyToken(req.headers.access_token)
        let { id } = decoded
        User.findByPk(id)
            .then(result => {
                if (result) {
                    req.currentUserId = result.id
                    return next()
                } else {
                    return next({
                        msg: "User Not Found"
                    })
                }
            })
    }
    catch(err) {
        return err
    }
} 

module.exports = authentication