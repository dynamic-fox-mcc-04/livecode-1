const router = require("express").Router();
const {User} = require("../models");

router.post("/register", (req, res) =>
    {
        let {email, password} = req.body;
        let data = {email, password};

        User.create(data)
        .then(data =>
        {
            res.status(201).json({id : data.id, email : data.email});
        })
        .catch(err =>
        {
            console.log(err);
        })
    });

router.post("/login", (req, res) =>
    {
        let {email, password} = req.body;

        User.findOne({where : {email}})
        .then(data =>
        {
            
        })
        .catch(err => 
        {

        })
    })

module.exports = router;