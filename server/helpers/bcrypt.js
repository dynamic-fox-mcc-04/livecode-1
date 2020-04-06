const bcrypt = require('bcryptjs')

function generatePassword(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function decryptPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { generatePassword, decryptPassword }