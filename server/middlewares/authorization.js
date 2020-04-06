const { Food } = require('../models')

function authorization(req, res, next) {
    Food.findOne({ where: { id: req.params.id }})
        .then(response => {
            if(response.UserId === req.user.id) {
                next()
            }
            else {
                return res.status(401).json({ type: 'Unauthorizzed', msg: 'You do not have access to this item'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = authorization