const router = require('express').Router()
const users = require('./UserRouter.js')
const foods = require('./FoodRouter.js')

router.use('/users', users)
router.use('/foods', foods)

module.exports = router