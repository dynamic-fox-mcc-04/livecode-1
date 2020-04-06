const router = require('express').Router()
const usersRoutes = require('./users')
const foodsRoutes = require('./foods')

router.get('/', (req, res) => { res.status(200).json('connected to server')})
router.use('/users', usersRoutes)
router.use('/foods', foodsRoutes)

module.exports = router