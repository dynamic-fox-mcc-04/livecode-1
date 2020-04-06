const { decode } = require('../helpers/jwt')
const { Food } = require('../models')

function authorization(req, res, nex) {


    try {
        let decoded = decode(req.headers.access_token)

        Food.findOne({
            where : { UserId : req.userId}
        })
        .then(result => {
            if (result){
                if ( result.id === decoded.id){
                    return next()
                } else {
                    return res.status(400).json({
                        name : 'not authorized',
                        msg : 'user not authorized'
                    })
                }
              
            } else {
                return res.status(400).json({
                    name : 'not authorized',
                    msg : 'user not authorized'
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                name : 'internal server error',
                msg : err
            })
        })
    } catch (err){

    }
    
}

module.exports = authorization