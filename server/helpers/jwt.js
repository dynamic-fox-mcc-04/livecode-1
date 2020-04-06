const jwt = require('jsonwebtoken');

function generateToken(data)
{
    return jwt.sign(data, process.env.token);
}

function verify(token)
{
    return jwt.verify(token, process.env.token);
}

module.exports = {generateToken, verify};