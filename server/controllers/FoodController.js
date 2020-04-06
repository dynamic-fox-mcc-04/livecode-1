const { Food } = require('../models')

class FoodController {
    static addFood (req, res, next) {
        const food = {
            title: req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            userId: req.currentuserId
        }
        Food.create(food)
        .then((result) => {
            res.status(201).json({
                id: result.id,
                title: result.title,
                price: result.price,
                ingredients: result.ingredients,
                tag: result.tag
            })
        }).catch((err) => {
            next(err)
        });
    }

    static readFood (req, res, next) {
        Food.findAll({
            where: {
                userId: req.currentuserId
            }
        })
        .then((result) => {
            return res.status(200).json({
                result
            })
        }).catch((err) => {
            next(err)
        });
    }

    static deleteFood (req, res, next) {
        Food.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            res.status(200).json({
                message: 'record has been deleted successfully'
            })
        }).catch((err) => {
            next(err)
        });
    }
 }

module.exports = FoodController