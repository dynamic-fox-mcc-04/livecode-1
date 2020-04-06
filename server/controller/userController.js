const { User } = require('../models')
const { getToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class UserController {
  static register(req, res, next) {
    let { email, password } = req.body
    User.create({
      email,
      password
    })
      .then((user) => {
        let payload = {
          id: user.id,
          email: user.email
        }
        let token = getToken(payload)
        res.status(201).json({
          id: user.id,
          email: user.email,
          token
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if(user) {
          let status = comparePassword(req.body.password, user.password)
          if(status) {
            let payload = {
              id: user.id,
              email: user.email
            }
            let token = getToken(payload)
            res.status(200).json({
              access_token: token
            })
          }
          else {
            next({ name: 'invalid email or password' })
          }
        }
        else {
          next({ name: 'invalid email or password' })
        }
      })
      .catch(next)
  }
}

module.exports = UserController