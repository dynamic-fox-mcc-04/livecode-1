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


// const { verifyToken } = require("../helper/jwt");
// const { User } = require("../models");

// module.exports = function (req, res, next) {
//     try {
//         if(req.headers.token) {
//             console.log(req.headers.token)
//             req.decoded = verifyToken(req.headers.token);
//             User.findOne({
//                 where: {
//                     email : req.decoded.email
//                 }
//             })
//             .then(result => {
//                 if(result) {
//                     return next()
//                 } else {
//                     return next({ 
//                         name: 'Unauthorized',
//                         errors: { message: `authentication failed`} 
//                     })
//                 }
//             })
//             .catch (error => {
//                 return next(error)
//             })
            
//         } else {
//             return next({ 
//                 name: 'Unauthorized',
//                 errors: {message: `authentication failed`} 
//             })
//         }
//     } catch (err) {
//         return next(err)
//     }
// } 