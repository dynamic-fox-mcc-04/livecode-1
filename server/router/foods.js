const express = require('express')
const router = express.Router()
const FoodController = require('../controller/foodController')
const authorization = require('../middlewere/authorization')

router.post('/', FoodController.add)
router.get('/', FoodController.display)
router.delete('/:id', authorization, FoodController.deleteFood)

module.exports = router