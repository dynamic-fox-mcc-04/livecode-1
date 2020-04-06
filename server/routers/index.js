const router = require('express').Router()
const user = require('../routers/user')

router.use('/users', user)


module.exports = router