const {verifyToken} = require('../helper/jwt')
const {User} =require('../models')

function authentication (req, res, next) {
    try{
        let decoded= verifyToken(req.headers.access_token)
        User.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(result => {
            if(result) {
                req.currentUserId= result.id;
                return next()
            } else{
                return res.status(404).json({
                    name:'Not Found',
                    errors: [{message: 'User Not Found'}]
                })
            }
        })
        .catch(err => {
            return res.status(401).json({
                name:'unauthorized',
                errors: [{message: 'unauthorized'}]
            })
        })
    }
    catch(err) {
        return res.status(500).json({
            err
        })
    }
}

module.exports= authentication