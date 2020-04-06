const router = require('express').Router()
const UserController = require('../controllers/user')
const FoodController = require('../controllers/food')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.post('/foods', FoodController.create)
router.get('/foods', FoodController.read)
router.delete('/foods/:id', authorization, FoodController.deleteItem)


module.exports = router