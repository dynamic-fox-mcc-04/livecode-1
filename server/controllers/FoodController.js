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
        const { userId } = req.headers.id
        Food.create({
                title: title,
                price: price,
                ingredients: ingredients,
                tag: tag,
                userId: userId
            })
            .then(result => {
                res.status(200).json({ data: result })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const { id } = req.params.id
        Food.destroy({
                where: {
                    id: id
                }
            })
            .then(result => {
                res.status(201).json({ message: 'delete success' })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = FoodController