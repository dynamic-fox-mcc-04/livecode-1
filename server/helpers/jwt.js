const jwt = require('jsonwebtoken');

function generateToken( payload ){
    return jwt.sign(payload, process.env.SECRET);
}

function verifyToken( token ){
    var decoded = jwt.verify(token, process.env.SECRET)
    return decoded
}

module.exports = { generateToken, verifyToken }