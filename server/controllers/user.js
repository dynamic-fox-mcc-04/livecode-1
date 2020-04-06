const { User } = require('../models')

const { generateToken } = require('../helpers/jwt')

class Controller {


    static login(req, res){
        
        const { email, password } = req.body

        User.findOne({
            where : { email : req.body.email}
        })
        .then(result => {

            if ( result ){
                
                if ( result.password === password ){

                    let payload = {
                        id : result.id,
                        email : result.email
                    }

                    let token = generateToken(payload)
                    res.status(200).json({
                        "access_token" : token
                    })
                } else {
                    res.status(400).json({
                        name : 'not found',
                        message  : 'invalid username/email'
                    })
                }
            } else {
                res.status(400).json({
                    name : 'not found',
                    message  : 'invalid username/email'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                name : 'internal server error',
                message  : err
            })
        })

    }
}

module.exports = Controller