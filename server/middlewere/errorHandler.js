function errorHandler(err, req, res, next) {
  let status = 500
  let errName = {
    message: 'Internal Server Error'
  }
  if(err.name === 'SequelizeValidationError') {
    status = 400
    let arrMessage = []
    for(let i = 0 ; i<err.errors.length ; i++) {
      arrMessage.push(err.errors[i].message)
    }
    errName = {
      message: 'Bad Request',
      errors: arrMessage
    }
  }
  else if(err.name === 'invalid email or password' ) {
    status = 400
    errName = {
      message: 'invalid email or password',
      errors: arrMessage
    }
  }
  else if(err.name === 'not authenticated' ) {
    status = 400
    errName = {
      message: 'not authenticated',
      errors: arrMessage
    }
  }
  res.status(status).json(errName)
}

module.exports = errorHandler