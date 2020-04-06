const verify = require('../helpers/jwt')
const {User} = require('../models')

function authen(req,res,next){
try{
    let decode = verify(req.headers.access_token)
    User.findOne({
        where:{
            id:decode.id
        }

    })
    .then(result=>{
        req.currrentid= result.id
        return next()
    })


} catch{

}
}