const router = require('express').Router()
const userRouter = require('./user')
const foodRouter = require('./food')

router.use('/users', userRouter)
router.use('/foods', foodRouter)

module.exports = router