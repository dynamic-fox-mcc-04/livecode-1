var express = require('express')
var router = express.Router()
const userController = require("../controllers/userController.js")

router.post('/register', userController.register)
router.post('/login', userController.login)

// router.use('/', (req, res) => res.send('Hello World!'))

module.exports = router