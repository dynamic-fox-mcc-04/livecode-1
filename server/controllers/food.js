const { Food } = require('../models/index')

class FoodController {
    static create(req, res) {
        let food = {
            title: req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            UserId: req.user.id
        }
        Food.create(food)
            .then(response => {
                return res.status(201).json(response)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
    static read(req, res) {
        Food.findAll({ where: { UserId: req.user.id }})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
}
module.exports = FoodController