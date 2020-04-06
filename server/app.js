require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT

const router = require("./routers/index.js")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())  
app.use(cors())


app.use(router)

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))