const router = require('express').Router()
const FoodController = require('../controllers/FoodController.js')
const { authentication } = require('../middlewares/auth.js')
const { authorization } = require('../middlewares/auth.js')

router.get('/', authentication, FoodController.read)
router.post('/', authentication, FoodController.create)
router.delete('/:id', authentication, authorization, FoodController.delete)

module.exports = router