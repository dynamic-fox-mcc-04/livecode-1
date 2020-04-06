const router = require('express').Router()
const user = require('../routers/user')
const food = require('../routers/food')

router.use('/users', user)
router.use('/foods', food)


module.exports = router