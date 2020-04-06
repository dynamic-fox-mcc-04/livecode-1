const router = require('express').Router()
const FoodController = require('../controllers/food')

router.post('/', FoodController.create)
router.get('/', FoodController.findAll)
router.delete('/:id', FoodController.delete)

module.exports = router