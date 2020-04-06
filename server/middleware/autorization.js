const {Food} = require('../models')

function autorization(req, res, next) {
    console.log('ini masuk',req.params.id)
    Food.findOne({
        where:{
            id: req.params.id
        }
    })
        .then((result)=>{
            console.log(result)
            if(result){
                if(result.UserId == req.currentUserId){
                    console.log('masuk auth')
                    next()
                }else{
                    console.log('gagal auth');
                    return next({
                        name:"NotAutorization",
                        errors:[{
                            message:'Not Autorization'
                        }]
                    })
                }
            }else{
                console.log('gagal trooos');
                return next({
                    name:'NotFound',
                    errors:[{
                        message:'data not found'
                    }]
                })
            }
        })
        .catch((err)=>{
            return next(err)
        })
}

module.exports = autorization