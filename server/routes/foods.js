const router = require('express').Router()
const Controller = require('../controllers/food')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', Controller.create)
router.get('/', Controller.findAll)
router.delete('/:id', Controller.delete)


module.exports = router