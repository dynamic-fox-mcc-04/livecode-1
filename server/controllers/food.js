const {User,Food} = require('../models')
const decrypt = require('../helpers/bcrypt')
const {generateToken,verify} = require('../helpers/jwt')
class Controller{

    static register(req,res){        
        let payload ={
            email: req.body.email, 
            password : req.body.password
        }

        console.log(req.body.email);
        User.create(payload)
        .then(result=>{
            res.status(200).json({
                result
            })
        })
    }
    static login(req,res){        
        let payload ={
            email: req.body.email, 
            password : req.body.password
        }
        
        User.findOne({
            where:{
                email:payload.email
            }
        })        
        
        .then(result=>{
            let token = generateToken(payload)
            res.status(200).json({
                access_token:token
            })
        })

    }

    static viewAll(req,res){
        Food.findAll({
            where:{
                UserId:req.currentuserId
            }
        })
        .then(result=>{
            res.status(200).json({
                msg:'Data berhasil',
                data:result
            })
        })
    }
    static create(req,res){
        
    }
    static delete(req,res){
        
    }
}
module.exports = Controller