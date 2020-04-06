const {User} = require('../models')
const {hashPassword, checkPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

let token

class UserCtrl {

    static register(req, res, next) {
        console.log(">>> USER REGISTER");
        console.log(req.body);

        return User.create({
            email: req.body.email,
            password: hashPassword(req.body.password)
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
            return res.status(400).json({message: 'BAD REQUEST'})
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
                        return res.status(401).json({message: 'UNAUTHORIZED'})
                    }


            } else {
                return res.status(404).json({message: 'NOT FOUND'})
            }
        })
        .catch(err => {
            console.log("ERROR LOGIN");
            return res.status(400).json({message: 'BAD REQUEST'})
        })

    }


}

module.exports = UserCtrl