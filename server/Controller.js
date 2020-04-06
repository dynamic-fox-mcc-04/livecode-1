const { User, Food } = require("./models/index")
const { encryptPassword, decryptPassword } = require("./helpers/bcrypt")
const { generateToken, verivy } = require("./helpers/jwt")

class Controller {
    static login(req, res, next) {
        let payload = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                'email': payload.email
            }
        }).then(result => {
            if (result) {
                let compare = decryptPassword(payload.password, result.password)
                if (compare) {
                    let user = {
                        id: result.id,
                        email: result.email
                    }
                    let token = generateToken(user)
                    return res.status(200).json({
                        access_token: token
                    })
                } else{
                    return next(err)
                }
            } else{
                return next(err)
            }
        }).catch(err => {
            return next(err)
        })


    }
    static register(req, res, next) {
        let payload = {
            email: req.body.email,
            password: encryptPassword(req.body.password)
        }
        User.create(payload)
            .then(result => {
                let user = {
                    id: result.id,
                    email: result.email
                }

                return res.status(201).json({
                    id: user.id,
                    email: user.email
                })
            }).catch(err => {
                return next(err)
            })
    }

    static addFood(req, res, next) {
        const { title, price, ingredients, tag } = req.body
        let UserId = req.currentUserId
        let food = {
            title,
            price,
            ingredients,
            tag,
            UserId
        }
        Food.create(food)
            .then(success => {
                const { id, title, price, ingredients, tag, UserId } = success
                res.status(201).json({
                    id, title, price, ingredients, tag, UserId
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static findAll(req, res, next) {
        Food.findAll()
            .then(data => {

            })
    }

    static update(req, res, next) {

    }
    static delete(req, res, next) {
        User.destroy()
    }
}

module.exports = Controller