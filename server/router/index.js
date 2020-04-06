const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const foodRouter = require('./foods')
const authentication = require('../middlewere/authentication')

router.use('/', userRouter)
router.use(authentication)
router.use('/foods', foodRouter)

module.exports = router