const router = require('express').Router()
const controllerFood = require('../controllers/food')

router.post('/',controllerFood.create)
router.get('/',controllerFood.viewAll)
router.delete('/:id',controllerFood.delete)

module.exports = router