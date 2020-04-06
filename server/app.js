require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')
const routers = require('./routers')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routers)
app.use(errorHandler)



app.listen(PORT, () => {
    console.log('I love u ', PORT)
})




