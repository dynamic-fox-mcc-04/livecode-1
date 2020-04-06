const router = require('express').Router()
const FoodController = require('../controllers/FoodController')
const { authorization } = require('../middlewares/authorization')

router.get('/', FoodController.showAll)
router.post('/', FoodController.create)
router.delete('/:id', authorization, FoodController.delete)

module.exports = router