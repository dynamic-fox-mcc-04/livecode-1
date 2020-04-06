require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router')
const errHandler = require('./middleware/errhandler.js')
const PORT = process.env.PORT
 
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(router)
app.use(errHandler)

app.listen(PORT,()=>{
    console.log('listening port', PORT);
    
})

