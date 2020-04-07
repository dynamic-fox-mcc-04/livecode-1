const { Food } = require('../models')

class Controller {

    static read(req, res){
        
        Food.findAll({
            where : { UserId : req.userId}
        })
        .then(result => {
            res.status(200).json(result)
        })
        
    }

    static create(req, res){

        const { title, price, ingredients, tag} = req.body
        const UserId = req.userId

        Food.create ({
            title,
            price,
            ingredients,
            tag,
            UserId
        })
        .then(result => {
            return res.status(201).json({
                "id" : result.id,
                "title" : result.title,
                "price" : result.price,
                "tag" : result.tag,
                "UserId" : result.UserId
            })
        })
        .catch(err => {
           return  res.status(500).json({
                name : 'internal server error',
                message  : err
            })
        })
    }

    static delete(req, res){

        Food.destroy({
            where : { id : req.params.id}
        })
        .then(() =>{
            res.status(200).json({
                "message" : "Successfully delete food from your menu"
            })
        })
        .catch(err => {
            return  res.status(500).json({
                name : 'internal server error',
                message  : err
            })
        })
    }
}

module.exports = Controller