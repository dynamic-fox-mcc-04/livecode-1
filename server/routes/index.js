const router = require('express').Router()
const controllerFood = require('../controllers/food')
const food = require('./food')
router.post('/register',controllerFood.register)
router.post('/login',controllerFood.login)

router.use('/food',food)
module.exports = router


