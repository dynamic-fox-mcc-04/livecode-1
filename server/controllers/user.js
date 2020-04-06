const {User} = require('../models')
const {hashPassword, checkPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')
const {customError} = require('../helpers/customError')

let token

class UserCtrl {

    static register(req, res, next) {

        console.log(">>> USER REGISTER");
        console.log(req.body);

        return User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(response => {
            
            if(response) {
                console.log("DUPLICATE!");
                throw new customError(400, 'EMAIL TAKEN')
            } else {
                
                console.log("LET'S CREATE NEW ONE");
                return User.create({
                    email: req.body.email,
                    password: hashPassword(req.body.password)
                })

            }

        })
        .then(response => {
            console.log("USER CREATED. NOW LOGGING IN");

            token = createToken({
                id: response.id,
                email: response.email
            })
            return res.status(201).json({access_token: token})
        })
        .catch(err => {
            console.log("ERROR REGISTERING");
            next(err)
        })
    }


    static login(req, res, next) {
        console.log(">>> USER LOGIN");
        console.log(req.body);

        return User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(response  => {
            if(response) {
                console.log("USER FOUND");
                let flag = checkPassword(req.body.password, response.password)
                    if(flag) {

                        console.log("LOGIN SUCCESS");

                        token = createToken({
                            id: response.id,
                            email: response.email
                        })

                        return res.status(200).json({access_token: token})

                    } else {
                        console.log("LOGIN FAIL");
                        throw new customError(400, 'WRONG PASSWORD/EMAIL')
                    }


            } else {
                throw new customError(400, 'WRONG PASSWORD/EMAIL')
            }
        })
        .catch(err => {
            console.log("ERROR LOGIN");
            next(err)
        })

    }


}

module.exports = UserCtrl