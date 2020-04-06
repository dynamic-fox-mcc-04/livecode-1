const router = require('express').Router()
const controller = require('../controllers/food_controller.js')

router.get('/foods', controller.findAll)
router.post('/foods', controller.create)
router.delete('/foods/:id', controller.delete)


module.exports = router