const { Food } = require("../models")

module.exports = (req, res, next) => {
    Food.findOne({
        where: {
            'id': req.params.id
        }
    }).then(result => {
        if (result) {
            return next()
        } else {
            return next({
                name: 'NotAuthorized'
            })
        }
    }).catch(err => {
        return next(err)
    })
}