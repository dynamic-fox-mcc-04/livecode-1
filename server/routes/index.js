const router = require("express").Router()
const Controller = require("../Controller.js")


router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/foods", Controller.addFood)
router.get("/foods", Controller.findAll)


module.exports = router