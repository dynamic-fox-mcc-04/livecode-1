const {Food} = require('./models')

function authorization(req, res, next) {
    console.log("AUTHORIZATION");

    Food.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(response  => {

        if(response) {
            if(response.UserId === req.decoded.id) {
                console.log("AUTHORIZATION SUCCESS");
                return next()
            }

        } else {
            console.log("NOT FOUND");
            return res.status(404).json({message: 'NOT FOUND'})
        }

    })
    .catch(err => {
        console.log("ERROR AUTHORIZING");
        return res.status(400).json({message: 'BAD REQUEST'})
    })

}

module.exports = {authorization}