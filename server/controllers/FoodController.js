const { Food } = require('../models');

class FoodController {
    static create(req, res, next) {
        const { title, price, ingredients, } = req.body;
    }

    static findAll() {

    }
}

module.exports = FoodController;