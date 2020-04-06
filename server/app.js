if(process.env.NODE_ENV === "development") {
    console.log("HELLO");
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes.js')

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log(`LISTENING TO ${PORT}`);
})