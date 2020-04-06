const { User } = require("../models/index.js")
const { comparePassword } = require("../helpers/bcrypt.js")
const { generateToken } = require("../helpers/jwt.js")

class userController {
    static register(req,res){
        let { email , password } = req.body
        let newUser = {
            email, password
        }
        User.create(newUser)
        .then(data => {
            res.status(201).json({
                id: data.id,
                email: data.email
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "InternalServerError",
                error:error
            })
        })
    }
    static login(req,res){
        let receivedEmail = req.body.email
        let receivedPassword = req.body.password
        User.findOne({where:{
            email:receivedEmail
        }})
        .then(result => {
            //bila ketemu, bila tidak
            if (result){
                //bila ketemu.. cek password dulu, kalau lulus buat token masuk, kalau gagal, gagalkan
                let compare = comparePassword( receivedPassword, result.password)
                if(compare){
                    //kalau password benar
                    let payload = {
                        id:result.id,
                        email:result.email
                    }
                    let token = generateToken(payload)
                    res.status(200).json({
                        access_token: token
                    })
                }else {
                    //kalau tidak...
                    res.status(400).json({
                        message:"BadRequest",
                        error:"Invalid email/password"
                    })
                }
            } else {
                res.status(400).json({
                    messsage:"BadRequest",
                    error:"Invalid email/password"
                })
            }

        })
        .catch(error => {
            res.status(500).json({
                message: "InternalServerError",
                error:error
            })
        })

    }
}

module.exports = userController