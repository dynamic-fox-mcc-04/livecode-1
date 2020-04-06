const { Food } = require('../models') 

const authorization = (req, res, next) => {
    Food.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((result) => {
        if (result) {
            if (result.userId == req.currentuserId) {
                next()
            } else {
                return next({
                    name: 'Unauthorized',
                    errors: [{ message: 'Unauthorized access detected' }]
                })
            }
        } else {
            return next({
                name: 'NotFound',
                errors: [{ message: 'Food not found' }]
            })
        }
    }).catch((err) => {
        return next(err)
    });
}

module.exports = authorization