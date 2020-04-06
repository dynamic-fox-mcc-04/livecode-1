let jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = function(req, res, next) {
    let access_token = req.headers.access_token
    console.log(access_token)
    let Authenticated = jwt.verify(access_token, process.env.SECRET)
    console.log(Authenticated.email)
    User.findOne({
        where: {
            email: Authenticated.email
        }
    })
        .then(function(result) {
            // console.log(result)
            if(result !== null) {
                console.log('result tidak null')
                let Auth = result
                req.Auth = Auth
                next()
            }
            else {
                return res.status(400).json({
                    msg: 'User Does Not Exist!!'
                })
            }
        })
        .catch(function(err) {
            return res.status(400).json({
                msg: "Not Authenticated"
            })
        })
}