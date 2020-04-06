const {User} = require('../models')
const {decode_password} = require('../helper/bcyript.js')
const {generate_token} = require('../helper/jwt.js')

class Controller{
    static register(req, res, next){
        const user = {
            email : req.body.email,
            password : req.body.password
        }
        console.log(user)
        User.create(user)
            .then((result)=>{
                const payload = {
                    id : result.id,
                    email : result.email 
                }
                
                const token = generate_token(payload)
                return res.status(201).json({
                    id : payload.id,
                    email : result.email,
                    // access_token : token
                })
            })
            .catch((err)=>{
                return next(err)
            })
    }

    static login(req, res, next){
        const user = {
            email : req.body.email,
            password : req.body.password
        }

        User.findOne({
            where:{
                email: user.email
            }
        })
            .then((result)=>{
                if(result){
                    const compare = decode_password(user.password, result.password)
                    if(compare){

                        const payload = {
                            id : result.id,
                            email : result.email 
                        }
                        
                        const token = generate_token(payload)
                        return res.status(200).json({
                            // id : payload.id,
                            // email : result.email,
                            access_token : token
                        })
                        
                    }else{
                        return next({
                            name: "BadRequest",
                            errors: [{message: "email/password salah"}]
                        })
                    }

                }else{
                    return next({
                        name: "BadRequest",
                        errors: [{message: "email/password salah"}]
                    })
                }
            })
            .catch((err)=>{
                return next(err)
            })
    }
}

module.exports = Controller