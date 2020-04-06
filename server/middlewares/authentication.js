const { verify } = require("../helpers/jwt")
const { User } = require("../models")

module.exports = (req, res, next) => {
    try {
        let decoded = verify(req.headers.access_token)
        User.findOne({
            where: {
                'id': decoded.id
            }
        }).then(result => {
            if (result) {
                req.currentUserId = result.id
                return next()
            } else {
                return next(err)
            }
        }).catch(err => {
            return next(err)
        })

    } catch (error) {
        return next(error)
    }
}