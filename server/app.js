require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT 
const cors = require('cors')
app.use(cors())
app.use(routes)
app.use(express.urlencoded({extended:false}))

app.listen(PORT,()=>{
    console.log('listening :'+PORT);
    
})
 