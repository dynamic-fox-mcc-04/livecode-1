const { Food } = require('../models')

class FoodController{
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

  static delete(req, res, next) {
    
  }
}

module.exports = FoodController