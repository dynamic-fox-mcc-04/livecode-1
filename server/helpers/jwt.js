const jwt = require('jsonwebtoken')

function createToken(payload) {
    return jwt.sign(payload, process.env.SECRET)
}


function checkToken(inputToken) {
    return jwt.verify(inputToken, process.env.SECRET)
}

module.exports = {
    createToken, checkToken
}