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
                        return next()
                    } else {
                        return next({
                            name: 'Unauthorized',
                            errors : { message: 'User not Authenticated'}
                        })
                    }
                })
                .catch(err => {
                    return next(err)
                })
        }
    }
    catch(err){
         return next(err)
    }
}
