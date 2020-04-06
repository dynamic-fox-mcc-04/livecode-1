const { User } = require('../models')
const { decode } = require('../helpers/jwt')


const authentication = (req, res, next) => {
    const payload = decode(req.headers.access_token)
    console.log(payload)
    User.findOne({
        where: {
            email: payload.email
        }
    })
    .then((result) => {
        console.log(result)
        next()
    }).catch((err) => {
        next(err)
    });
}

module.exports = authentication