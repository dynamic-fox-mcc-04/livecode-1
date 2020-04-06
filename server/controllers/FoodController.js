const { Food } = require('../models')

class FoodController {
    static showAll(req, res, next) {

        Food.findAll()
            .then(result => {
                res.status(200).json({ data: result })
            })
    }

    static create(req, res, next) {
        const { title, price, ingredients, tag } = req.body
        Food.create({
                title: title,
                price: price,
                ingredients: ingredients,
                tag: tag
            })
            .then(result => {
                res.status(200).json({ data: result })
            })
            .catch(next)
    }

    static delete(req, res, next) {

    }
}