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

    }


    static delete (req, res) {

    }
}

module.exports = Controller