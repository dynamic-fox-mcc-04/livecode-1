const {User} = require('../models')
const {decryptPassword} = require('../helper/bcrypt')
const {generateToken}= require('../helper/jwt')

class UserController{
    static register(req, res) {
        const{email, password} = req.body
        let payload = {
            email,
            password
        }
        User.create(payload)
            .then(result=> {
                let user = {
                    id: result.id,
                    email: result.email
                }
                let token = generateToken(user)
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                    access_token: token
                })
            })
            .catch(err => {
                if(err.name==='SequelizeValidationError'){
                    const errors= err.errors.map(el => ({
                        message: el.message
                    }))
                    res.status(400).json({
                        code:400,
                        name: 'Bad Request',
                        errors: errors
                    })
                } else {
                    res.status(500).json({
                        code: 500,
                        name: err.name,
                        errors: err.errors
                    })
                }
            })
    }

    static login(req, res) {
        const {email, password}= req.body
        let payload= {
            email, 
            password
        }
        User.findOne({
            where: {
                email:payload.email
            }
        })
            .then(result => {
                if(result) {
                    let compare= decryptPassword(payload.password, result.password)
                    if(compare) {
                        let user = {
                            id: result.id,
                            email: result.email
                        }
                        let token= generateToken(user)
                        res.status(200).json({
                            id: user.id,
                            email: user.email,
                            access_token: token
                        })
                    }
                }
            })
    }
}

module.exports= UserController