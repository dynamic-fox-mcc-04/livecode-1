const router = require('express').Router()
const user = require('./user.js')
const food = require('./food')

router.use(user)
router.use('/food', food)

module.exports = router