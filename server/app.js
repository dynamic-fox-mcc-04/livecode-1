require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes= require('./routes/index.js')

app.use(express.urlencoded({extended:false}))
app.use(express.json)
app.use(routes)

app.use((err, req, res, next)=>{
    if(err.name = "SequelizeValidationError"){
        const errors = err.errors.map(el => {message: el.message})
        res.status(400).json({
            errors
        })
    }
    res.status(500).json(err)
}) 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))