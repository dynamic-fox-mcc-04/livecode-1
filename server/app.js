require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)
    // app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Port : ' + PORT);
})