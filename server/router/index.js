const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const foodRouter = require('./foods')

router.use('/', userRouter)
router.use('/foods', foodRouter)

module.exports = router