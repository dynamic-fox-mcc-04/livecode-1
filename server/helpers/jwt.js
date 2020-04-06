const jwt = require("jsonwebtoken")


function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRETTOKEN)
}

// console.log(process.env.SECRETTOKEN);


function verify(token) {
    return jwt.verify(token.process.env.SECRETTOKEN)
}

module.exports = {
    generateToken,
    verify
}