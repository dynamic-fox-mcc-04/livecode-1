function customError(code, message) {
    let err = new Error()
    err.code = code
    err.message = message
    return err
}

module.exports = {customError}