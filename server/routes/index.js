const router = require('express').Router()
const user = require('./user')
const food = require('./food')
const { authentication } = require('../middlewares/authentication')

router.get('/', (req, res, next) => {
    res.send('success')
})

router.use('/users', user)
router.use(authentication)
router.use('/foods', food)

module.exports = router