function errHandler(err, req, res, next) {
    if(err.name == 'SequelizeValidationError'){
        return res.status(400).json(err.errors)
    }else if(err.name == 'BadRequest'){
        return res.status(400).json(err.errors)
    }else if(err.name == 'NotFound'){
        return res.status(404).json(err.errors)
    }
    return res.status(500).json(err)
}

module.exports =  errHandler