const router = require('express').Router()
const Controller = require('../controllers/food')

router.get('/', Controller.main)

module.exports = router