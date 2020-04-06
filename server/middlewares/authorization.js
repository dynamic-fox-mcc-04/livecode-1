const { Food } = require('../models')

function authorization(req, res, next) {
    let { id } = req.params
    Food.findOne({
            where: { id }
        })
        .then(data => {
            if (data) {
                if (data.userId == req.logged_user.id) {
                    next()
                } else {
                    next({ status: 401, msg: 'not allowed' })
                }
            } else {
                next({ status: 404, msg: 'data not found' })
            }
        })
        .catch(next)
}

module.exports = { authorization }