const router = require("express").Router()
const Controller = require("../Controller.js")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
router.use(authentication)
router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/foods", Controller.addFood)
router.get("/foods", Controller.findAll)
router.delete("/foods/:id", authorization, Controller.delete)


module.exports = router