const {Sequelize} = require('./models')

function errorHandler(err, req, res, next) {

    console.log(">>> ENTERING ERROR HANDLERS");

    if(err instanceof Sequelize.ValidationError) {
        let arr = []
        err.message.forEach(el => {
            arr.push(el)
        })

        res.status(400).json({
            message: arr
        })
    } else if(err instanceof Sequelize.EmptyResultError) {
        res.status(404).json({message: err.message})
    } else if(err instanceof Sequelize.DatabaseError) {
        res.status(500).json({message: 'Internal Server Error'})
    } else if(err.name === 'JsonWebTokenError') {
        res.status(400).json({message: 'Invalid Token'})
    } else if(err instanceof Error) {
        res.status(err.code).json({message: err.message})
    }
    else {
        res.status(500).json({message: 'Internal Server Error'})
    }

}

module.exports = {errorHandler}