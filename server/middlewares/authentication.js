const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');


module.exports = function(req, res, next) {
    try {
        if(req.headers.access_token) {
            req.decoded = verifyToken(req.headers.access_token);
            User.findOne({
                where: {
                    email : req.decoded.email
                }
            })
                .then(result => {
                    if(result) {
                        next()
                    } else {
                        return next({
                            name: 'Unauthotized',
                            errors : { message: 'User not Authenticated'}
                        })
                    }
                })
                .catch(err => {
                    return next({
                        name: 'NotFound',
                        errors: { message: 'User Not Found' }
                    })
                })
        }
    }
    catch(err){
         return next(err)
    }
}