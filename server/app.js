require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT 
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(routes)
app.listen(PORT,()=>{
    console.log('listening :'+PORT);
    
})
 