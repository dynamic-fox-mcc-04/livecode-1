const {User, Food} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
class Controller {
    static Register(req, res) {
        let {email, password} = req.body
        User.create({
            email,
            password
        })
            .then(function(result) {
                let payload = {
                    id: result.id,
                    email: result.email
                }
                return res.status(201).json(payload)
            })
    }

    static Login(req, res) {
        let {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(function(result) {
                if(result !== null) {
                    let status = bcrypt.compareSync(password, result.password)
                    if(status) {
                        let payload = {
                            id: result.id,
                            email: result.email
                        }
                        let access_token = jwt.sign(payload, process.env.SECRET)
                        return res.status(200).json({
                            access_token
                        })
                    }
                    else {
                        return res.status(400).json({
                            message: 'Wrong Email / Password'
                        })
                    }
                }
                else {
                    return res.status(400).json({
                        message: 'User Does Not Exist!!'
                    })
                }
            })
            .catch(function(err) {

            })
    }

    static FetchFood(req, res) {
        console.log('MASUK FETCH FOOD')
        Food.findAll({
            where: {
                UserId: req.Auth.id
            },
            order: [['id', 'DESC']]
        })
            .then(function(result) {
                return res.status(200).json(result)

            })
            .catch(function(err) {
                console.log(err)
                return res.status(400).json({
                    message: "Failed to Fetch Food List"
                })
            })
    }

    static AddFood(req, res) {
        let {title, price, ingredients, tag} = req.body
        Food.create({
            title,
            price,
            ingredients,
            tag,
            UserId: req.Auth.id

        })
            .then(function(result) {
                let payload = {
                    id: result.id,
                    title: result.title,
                    price: result.price,
                    ingredients: result.ingredients,
                    tag: result.tag,
                    UserId: result.UserId
                }
                return res.status(201).json(result)
            })
            .catch(function(err) {
                console.log(err)
                return res.status(400).json({
                    message: "Please Fill It Correctly!!"
                })
            })
    }

    static DeleteFood(req,res) {
        console.log('masuk deletefood')
        Food.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function(result) {
                return res.status(200).json({
                    message: "Successfully delete food from your menu"
                })
            })
            .catch(function(err) {
                return res.status(400).json(err)
            })
    }
}

module.exports = Controller