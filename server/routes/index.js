const express = require('express')
const router = express.Router()
const authentication= require('../middlewares/authentication')
const userController= require('../controller/user')
const foodController= require('../controller/Food')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.post('/foods',authentication, foodController.create)
// router.get('/foods',authentication, foodController.findAll)

module.exports= router