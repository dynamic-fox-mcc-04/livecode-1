const express = require('express')
const router = express.Router()
const userRouter = require('../controller')

router.use('/user', userRouter)