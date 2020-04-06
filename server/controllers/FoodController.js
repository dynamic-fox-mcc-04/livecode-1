const models = require('../models')

class FoodController {
    static read(req, res, next) {
        return models.Food.findAll({ where: { UserId: req.loggedUserId } })
            .then(result => {
                console.log(`findall food`)
                console.log(result)
                return res.status(200).json({
                    Foods: result
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static create(req, res, next) {
        console.log(`create food`)
        const { title, price, ingredients, tag } = req.body
        const data = { title, price, ingredients, tag, UserId: req.loggedUserId }
        console.log(data)
        return models.Food.create(data)
            .then(result => {
                console.log(`ini result`)
                console.log(result)
                return res.status(201).json({
                    result
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        let param = req.params.id
        return models.Food.destroy({ where: { id: param } })
            .then(result => {
                return res.status(200).json({
                    message: `Successfully delete food from your menu`
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = FoodController