const express = require('express')
const router = express.Router()
const FoodController = require('../controller/foodController')

router.post('/', FoodController.add)
router.get('/', FoodController.display)
router.delete('/:id', FoodController.delete)

module.exports = router