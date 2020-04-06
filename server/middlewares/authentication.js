const {verify} = require("../helpers/jwt");
const {User} = require("../models");

function authentication(req, res, next)
{
    try {
        let id = verify(req.headers.token);
        console.log(id)
        User.findByPk(id)
        .then(data =>
        {
            if(!data)
                return res.status(404).json({error : "You must login"});
            
            req.user_id = data.id;
            return next();
        })
      } catch(err) {
        return res.status(500).json({error : err});
      }
}

module.exports = {authentication};