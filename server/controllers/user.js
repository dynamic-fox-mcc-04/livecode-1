const { User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

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
                    let compare = decryptPass(payload.password, result.password)
                    if (compare) {
                        let { id, email } = result
                        let user = { id, email }
                        let token = generateToken(user)
                        return res.status(200).json({
                            'access_token': token
                        })
                    } else {
                        return res.status(400).json({
                            msg: 'Invalid Email / Password'
                        })
                    }
                } else {
                    return res.status(404).json({
                        msg: 'User Not Found'
                    })
                }
            })
            .catch( err => {
                return json.status(500).json({
                    msg: err
                })
            })
    }

}

module.exports = Controller