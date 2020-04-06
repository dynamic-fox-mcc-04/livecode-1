const { decode } = require('../helpers/jwt')
const { User } = require('../models') 

function authentication(req, res, next){

    try {
        let decoded = decode(req.headers.access_token)

        User.findOne({
            where : { id : decoded.id }
        })
        .then(result => {
            
            if (result){
                req.userId = result.id
                return next()

            } else {
                return res.status(400).json({
                    name : 'not authorized',
                    msg : 'user not authenticated'
                })
            }
        })
        .catch(err => {

            return res.status(400).json({
                name : 'not authorized',
                msg : 'user not authenticated'
            })
        })

    } catch (err){
        return res.status(500).json({
            name : 'permmision issue',
            msg : 'need Token !!'
        })
    }


}

module.exports = authentication