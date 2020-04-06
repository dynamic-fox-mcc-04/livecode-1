const { Food } = require('../models');

class FoodController {
    static create(req, res, next) {
        const { title, price, tag, ingredients, } = req.body;
        const payload = {
                title,
                price,
                tag,
                ingredients,
                UserId : req.decoded.id
        }
        Food.create(payload)
            .then(foods => {
                console.log(foods)
                if(foods) {
                    return res.status(201).json(foods)
                } else {
                    return next({
                        name: 'BadRequest',
                        errors : { message: 'Invalid Input '}
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static findAll(req, res, next) {
        Food.findAll({
            where: {
                UserId: req.decoded.id
            },
            order : [['updatedAt']]
        })
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        let { id } = req.params;
        Food.destroy({
            where: { id }
        })
            .then(result => {
                return res.status(200).json({
                    message: 'Successfully delete food from your menu'
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = FoodController;