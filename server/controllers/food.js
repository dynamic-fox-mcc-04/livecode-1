const { Food } = require('../models')

class Controller {
    static create (req, res) {
        let { title, price, ingredients, tag } = req.body
        let newCreate = { title, price, ingredients, tag, UserId : req.currentUserId }

        Food.create(newCreate)
            .then(result => {
                return res.status(201).json({
                    id: result.id,
                    title: result.title,
                    price: result.price,
                    ingredients: result.ingredients,
                    tag: result.tag,
                    UserId: result.UserId
                })
            })
            .catch(err => {
                return res.status(500).json({
                    msg: err
                })
            })
    }

    static findAll (req, res) {
        let payload = {
            UserId: req.currentUserId
        }
        Food.findAll({
            where: {
                UserId: payload.UserId
            }
            // ,
            // order: [
            //     ['tag', 'ASC'],
            //     ['createdAt', 'DSC'],
            //     ['title', 'ASC']
            // ]
        })
            .then(result => {
                return res.status(200).json({
                    result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    msg: err
                })
            })
    }


    static delete (req, res) {
        let { id } = req.params

        Food.destroy({
            where: {
                id
            }
        })
            .then(result => {
                res.status(200).json({
                    "message": "Successfully delete food from your menu"
                })
            })

            .catch(err => {
                return res.status(500).json({
                    msg: err
                })
            })
    }
}

module.exports = Controller