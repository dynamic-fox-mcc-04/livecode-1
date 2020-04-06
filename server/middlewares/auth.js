const models = require('../models')
const { decodeToken } = require('../helpers/jwt.js')

const authentication = (req, res, next) => {
    try {
        let decode = decodeToken(req.headers.token)
        return models.User.findOne({ where: { id: decode.id } })
            .then(result => {
                if (result) {
                    req.loggedUserId = result.id
                    return next()
                } else {
                    return next({
                        name: `NotFound`,
                        errors: [{ message: `User Not Found` }]
                    })
                }
            })
            .catch(err => {
                return next({
                    name: `Unauthenticated`,
                    errors: [{ message: `user is unauthenticated` }]
                })
            })
    } catch (err) {
        return next(err)
    }
}

const authorization = (req, res, next) => {
    return models.Food.findOne({ where: { id: req.params.id } })
        .then(result => {
            if (result) {
                if (req.loggedUserId == result.UserId) {
                    return next()
                } else {
                    return next({
                        name: `Unauthorized`,
                        errors: [{ message: `user is unauthorized` }]
                    })
                }
            } else {
                return next({
                    name: `Unauthorized`,
                    errors: [{ message: `user is unauthorized` }]
                })
            }
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    authentication,
    authorization
}