const router = require('express').Router()
const Controller = require('../controller/controller')
const Authentication = require('../middleware/authentication')

router.get('/', function(req, res){
    res.status(200).json({
        message: "Home Domain Connected euy~"
    })
})

router.post('/register', Controller.Register)
router.post('/login', Controller.Login)
router.get('/foods', Authentication, Controller.FetchFood)
router.post('/foods', Authentication, Controller.AddFood)
router.delete('/foods/:id', Authentication, Controller.DeleteFood)


module.exports = router