const {Food} = require("../models") 

class FoodController {
    static create(req, res, next){
        const newFood = {
            title : req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            UserId: req.currentUserId
        }
        Food.create(newFood)
        .then(result => {
            return res.status(201).json({
                Food: result
            })
        })
        .catch(err => {
            return next(err)
        })

    }
    static findAll (req, res, next){
        Food.findAll({

        })
        .then(result => {
            return res.status(200).json({
                Food: result
            })
        })
        .catch(err => {
            return next(err)
        })

    }
    static delete(req, res, next){
        Food.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            return res.status(200).json({
                "message": "Successfully delete food from your menu"
            })
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = FoodController