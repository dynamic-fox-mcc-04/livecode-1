require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const router = require('./router/index')
const errorHandler = require('./middlewere/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})