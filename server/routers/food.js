const router = require('express').Router()
const FoodController = require('../controllers/FoodController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.post('/', FoodController.addFood)
router.get('/', FoodController.readFood)
router.delete('/:id', authorization, FoodController.deleteFood)

module.exports = router