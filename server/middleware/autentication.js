const {decode_token} = require('../helper/jwt.js')
const {User} = require('../models')

function autentication(req, res, next) {
    try {
        const decoded = decode_token(req.headers.access_token)
        console.log(decoded)
        User.findOne({
            where:{
                id: decoded.id
            }
        })
            .then((result)=>{
                if(result){
                    // console.log(result.id)
                    req.currentUserId = result.id
                    // console.log('dari auth', req.currentUserId)
                    next()
                }else{
                    next({
                        name: "NotFound",
                        errors: [{message: "User no Found Please Login First"}]
                    })
                }
            })
            .catch((err)=>{
                next({
                    name: "NotAutenticate",
                    errors: [{message: "User Not Autenticate"}]
                })
            })

      } catch(err) {
        return next(err)
    }
    // return next()
}

module.exports = autentication