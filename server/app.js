// require('dotenv').config()
// const express = require('express')
// const app = express()
// const port = 3000


// app.use(express.urlencoded({extended:false}))
// app.use(express.json)
// app.use(routes)

// app.get('/', (req, res) => res.send('Hello World! wwwwwwww'))


// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes= require('./routes/index.js')

app.use(express.urlencoded({extended:false}))
app.use(express.json)
app.use(routes)

app.get('/', (req, res) => res.send('Hello World!'))

app.use((err, req, res, next)=>{
    if(err.name == "SequelizeValidationError"){
        const errors = err.errors.map(el => ({message: el.message}))
        return res.status(400).json({errors})
    }
    return res.status(500).json({err: err})
}) 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))