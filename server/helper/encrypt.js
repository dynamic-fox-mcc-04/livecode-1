let bcrypt = require('bcryptjs')

function encrypt(value) {
    let salt = bcrypt.genSaltSync(3)
    let hash = bcrypt.hashSync(value, salt)

    return hash
}

module.exports = encrypt