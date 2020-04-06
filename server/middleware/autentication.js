const {decode_token} = require('../helper/jwt.js')

function autentication(req, res, next) {
    const decoded = decode_token(req)
}