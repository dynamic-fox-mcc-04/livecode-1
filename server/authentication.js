const {User} = require('./models')
const {checkToken} = require('./helpers/jwt')

function authentication(req, res, next) {
    console.log(">>> AUTHENTICATION");
    try {

        let token = req.headers.access_token
        let payload = checkToken(token)

        return User.findOne({
            where: {
                id: payload.id
            }
        })
        .then(response => {
            if(response) {

                console.log("USER FOUND");
                if(payload.id === response.id) {
                    console.log("AUTHENTICATED");
                    req.decoded = payload
                    return next()
                } else {
                    console.log("AUTHENTICATION FAILED");
                    return res.status(401).json({message: 'UNAUTHORIZED'})
                }

            } else {
                return res.status(404).json({message: 'NOT FOUND'})
            }
        })

    }
    catch(err) {
        return res.status(400).json({message: 'BAD REQUEST'})
    }
}

module.exports = {authentication}