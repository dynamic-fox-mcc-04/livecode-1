if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes/index')
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(process.env.PORT, () => console.log(`listening to PORT ${process.env.PORT}`))