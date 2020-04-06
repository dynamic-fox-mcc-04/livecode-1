const bcrypt = require('bcryptjs');

function encode_password(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function decode_password(password, hash) {
    return bcrypt.compareSync(password, hash);
}


module.exports = {
    encode_password,
    decode_password
}
