const { User } = require('../models')

class Controller {
    
    static register (req, res) {
        let { email, password } = req.body

            let payload = { email, password }

            User.create(payload)
                .then(result => {
                    return res.status(201).json({
                        id: result.id,
                        email: result.email
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        msg: err
                    })
                })
    }

    static login (req, res) {
        let { email, password } = req.body
        let payload = { email, password }

        User.findOne({
            where: {
                email: payload.email
            }
        })
            .then(result => {
                if (result) {
                    let compare = decryptPass()
                } else {
                    return res.status(404).json({
                        msg: err
                    })
                }
            })
    }

}

module.exports = Controller