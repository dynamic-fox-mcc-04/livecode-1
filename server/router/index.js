const router = require('express').Router()
const user = require('./user.js')
// const food = require('./food')
const autentication = require('../middleware/autentication.js')
const autorization = require('../middleware/autorization.js')
const controller = require('../controllers/food_controller.js')

router.use(user)

router.use(autentication)
router.get('/foods', controller.findAll)
router.post('/foods', controller.create)
router.delete('/foods/:id', autorization, controller.delete)

module.exports = router