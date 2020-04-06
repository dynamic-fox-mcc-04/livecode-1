const {Food} = require('../models')

class FoodController{
    static create(req, res) {
        const {title, price, ingredients, tag} = req.body
        Food.create({
            title,
            price,
            ingredients,
            tag
        })
            .then(result => {
                res.status(201).json({
                    message: 'Success adding food'
                })
            })
            .catch(err =>{
                res.status(500).json({
                    err
                })
            })
    }
    static findAll (req, res) {}
}

module.exports= FoodController