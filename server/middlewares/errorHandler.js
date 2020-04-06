const errorHandler = (err, req, res, next) => {
    if (err.name == `SequelizeValidationError`) {
        const errors = err.errors.map(el => {
            return { message: el.message }
        })
        return res.status(400).json({
            errors
        })
    } else if (err.name == 'BadRequest' || err.name == 'NotFound') {
        return res.status(404).json({ errors: err.errors })
    } else if (err.name == 'Unauthenticated') {
        return res.status(401).json({ errors: err.errors })
    } else if (err.name == 'Unauthorized') {
        return res.status(403).json({ errors: err.errors })
    } else if (err.name == 'JsonWebTokenError') {
        return res.status(403).json({
            errors: [{ message: `You Must Login First` }]
        })
    } else {
        return res.status(500).json({ errors: err.errors })
    }
}

module.exports = errorHandler