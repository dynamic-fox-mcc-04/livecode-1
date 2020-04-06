const { Food } = require('../models')

class FoodController {
  static add(req, res, next) {
    let { title, price, ingredients, tag } = req.body
    Food.create({
      title,
      price,
      ingredients,
      tag,
      UserId: req.currentUserId
    })
      .then((food) => {
        res.status(201).json(food)
      })
      .catch(next)
  }

  static display(req, res, next) {
    Food.findAll({
      where: {
        UserId: req.currentUserId
      }
    })
      .then((food) => {
        res.status(200).json(food)
      })
      .catch(next)
  }

  static deleteFood(req, res, next) {
    let id = req.params.id
    Food.destroy({
      where: {
        id
      }
    })
      .then(_ => {
        res.status(200).json({
          message: 'Successfully delete food from your menu'
        })
      })
      .catch(next)
  }
}

module.exports = FoodController