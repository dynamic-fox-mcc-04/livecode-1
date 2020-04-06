const { Food } = require('../models')

function authorization(req, res, next) {
  Food.findOne({
    where: {
      id: req.params.id,
      UserId: req.currentUserId
    }
  })
  .then((food) => {
    if(food) {
      next()
    }
    else{
      res.status(401).json({ name:'Unauthorized' })
    }
  })
  .catch((err) => {
    res.status(401).json({ name:'Unauthorized' })
  })
}

module.exports = authorization