const router = require('express').Router();
const users = require('../controllers/user')
const foods = require('../controllers/food')
const auth = require('../middleware/authentication')
const authorize = require('../middleware/authorization')

router.post('/login', users.login)

router.use(auth)
router.post('/foods',foods.create)
router.get('/foods', foods.read)
router.delete('/foods/:id',foods.delete)

module.exports = router