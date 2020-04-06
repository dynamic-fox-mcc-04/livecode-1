const router = require('express').Router()

const UserCtrl = require('./controllers/user')
const FoodCtrl = require('./controllers/food')
const {authentication} = require('./authentication')
const {authorization} = require('./authorization')

router.post('/register', UserCtrl.register)
router.post('/login', UserCtrl.login)

router.use(authentication)
router.get('/foods', FoodCtrl.getAll)
router.get('/foods/:id', FoodCtrl.getOne)
router.post('/foods', FoodCtrl.add)
router.delete('/foods/:id', authorization, FoodCtrl.drop)

module.exports = router