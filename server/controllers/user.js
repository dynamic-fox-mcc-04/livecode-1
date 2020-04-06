const {User} = require("../models") 
const {decryptPassword} = require("../helper/bcrypt")
const {generateToken} = require("../helper/jwt")

class UserController {
    static register (req, res, next){
        res.send("test")
        let payload ={ 
            email: req.body.email,
            password: req.body.password
        }
        console.log(payload);
        
        User.create(payload)
        .then(result => {
            let user = {
                id: result.id,
                email: result.email
            }
            let token = generateToken(user)
            return res.status(201).json({
                id: user.id,
                email: user.email
            })

        })
        .catch(err => {
            return next(err)
        })
    }
    static login(req, res, next){
        let payload ={ 
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then(result=> {
            if(result){
                let compare = decryptPassword(payload.password)
                if(compare){
                    let user = {
                        id: result.id,
                        email: result.email
                    }
                    let token = generateToken(user)
                    return res.status(200).json({
                        id: user.id,
                        emal: user.email,
                        access_token : token
                    })
                }
                else {
                    return res.status(403).json({
                        msg: 'Invalid'
                    })
                }
            }
            else{
                return res.status(403).json({
                    msg: 'Invalid'
                })
            }
            
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = UserController