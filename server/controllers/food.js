const {Food} = require("../models") 

class FoodController {
    static create(req, res, next){
        const newFood = {
            title : req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            UserId: req.currentUserId
        }
        Food.create(newFood)
        .then(result => {
            return res.status(201).json({
                Food: res
            })
        })
        .catch()

    }
    static findAll (req, res, next){

    }
    static delete(req, res, next){

    }
}

module.exports = FoodController