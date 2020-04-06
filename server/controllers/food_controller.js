const {Food} = require('../models')

class Controller{

    static create(req, res, next){
        const food = {
            title : req.body.title ,
            price : req.body.price,
            ingredients : req.body.ingredients,
            tag : req.body.tag,
            UserId : req.currentUserId
        }
        console.log(food);
        Food.create(food)
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(err=>{
                next(err)
            })
        
    }

    static delete(req, res, next){
        console.log('masuk delete')
        const id = req.params.id
        Food.destroy({
            where:{
                id
            }
        })
            .then((result)=>{
                console.log('ini data',result)
                return res.status(200).json(result)
            })
            .catch((err)=>{
                console.log('err',err)
                return next(err)
            })
    }

    static findAll(req, res, next){
        console.log('ini id', req.currentUserId)
        Food.findAll({
            where:{
                UserId: req.currentUserId
            }
        })
            .then((result)=>{
                console.log('ini data',result)
                return res.status(200).json(result)
            })
            .catch((err)=>{
                console.log('err',err)
                return next(err)
            })
    }
}

module.exports = Controller