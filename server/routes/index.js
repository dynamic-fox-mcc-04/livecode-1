const router = require('express').Router()
const food = require('./food')

router.use('/food',food)
module.exports = router


