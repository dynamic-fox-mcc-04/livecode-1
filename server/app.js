require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/", router);
app.use((err, req, res, next) =>
{
    return res.status(500).json({error : "Internal Server Error"});
})

app.listen(process.env.PORT, console.log(`Success running on PORT ${process.env.PORT}`));