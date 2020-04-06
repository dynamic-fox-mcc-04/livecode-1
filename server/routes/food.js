const router = require('express').Router()
const FoodController = require('../controllers/food')

router.post('/', FoodController.create)


module.exports = router