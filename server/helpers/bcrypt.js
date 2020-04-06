const bcrypt = require('bcryptjs')
function encryptpass(pass){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(pass,salt)
    return hash
}
function decryptpass(pass,hash){
    return bcrypt.compareSync(pass,hash)
}
module.exports = {encryptpass,decryptpass}