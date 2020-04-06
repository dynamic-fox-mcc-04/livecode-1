const { User } = require('../models')
const { decode } = require('../helpers/jwt')


const authentication = (req, res, next) => {
   try {
    const payload = decode(req.headers.access_token)
    User.findOne({
        where: {
            email: payload.email
        }
    })
    .then((result) => {
        console.log('hai')
        console.log(result)
        if (result) {
            req.currentuserId = result.id
            next()
        } else {
            return next({
                name: 'Unauthorized',
                errors: [{ message: 'Unauthorized access detected' }]
            })
        }
    }).catch((err) => {
        next(err)
    });
   } catch (err) {
       return next(err)
   }
}

module.exports = authentication