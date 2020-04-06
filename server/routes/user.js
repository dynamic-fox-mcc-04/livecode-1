const router = require('express').Router()
const UserController =require('../controllers/user')

// router.get('/', (req, res) => res.send('Hello World!'))
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router