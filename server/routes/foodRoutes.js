const router = require('express').Router();
const foodController = require('../controllers/FoodController');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.post('/foods', foodController.create);
router.get('/foods', foodController.findAll);
router.delete('/foods/:id', foodController.delete);
router.use(authorization);

module.exports = router;