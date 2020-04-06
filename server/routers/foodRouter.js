var express = require('express')
var router = express.Router()
const userController = require("../controllers/userController.js")
const foodRouter = require("./foodRouter.js")
//authentication and authorization happen here


// router.post('/food', foodRouter)


// router.use('/', (req, res) => res.send('Hello World!'))

module.exports = router