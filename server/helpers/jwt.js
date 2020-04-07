const jwt = require('jsonwebtoken')

function generateToken( payload ){;
    
    return jwt.sign( payload, process.env.KEY);
}

function decode( payload ) {
    return jwt.verify( payload , process.env.KEY)
}

module.exports = { generateToken, decode }