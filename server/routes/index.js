const router = require('express').Router();
const users = require('../controllers/user')
const foods = require('../controllers/food')
const auth = require('../middleware/authentication')

router.post('/login', users.login)

router.use(auth)
router.post('/foods', foods.create)
router.get('/foods', foods.read)

module.exports = router