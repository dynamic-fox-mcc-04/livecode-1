function errorHandler(err, req, res, next) {
    if(err.name == 'SequelizeValidationError') {
        const errors = err.errors.map(el => {
            message = el.message
        })
        return res.status(400).json({
            code: '400',
            type: 'BadRequest',
            error: errors
        })
    } else if(err.name == 'BadRequest') {
        return res.status(400).json({
            errors: err.error
        })
    } else if(err.name == 'InternalServerError') {
        return res.status(500).json({
            errors: err.error
        })
    } else if(err.name == 'UserNotFound') {
        return res.status(404).json({
            errors: err.error
        })
    } else if(err.name == 'JsonWebTokenError') {
        return res.status(401).json({
            errors: err.error
        })
    } else if(err.name == 'Unauthorized') {
        return res.status(401).json({
            errors: err.error
        })
    } else if(err.name == 'Forbidden') {
        return res.status(403).json({
            errors: err.error
        })
    } else {
        return res.status(500).json({
            errors: err.error
        })
    }
}


module.exports = errorHandler;