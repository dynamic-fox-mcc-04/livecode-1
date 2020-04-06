const router = require("express").Router();
const {User, Food} = require("../models");
const {decrypt} = require("../helpers/bcrypt");
const {generateToken} = require("../helpers/jwt");
const {authentication} = require("../middlewares/authentication");

router.post("/register", (req, res) =>
    {
        let {email, password} = req.body;
        let data = {email, password};
        console.log(req.body)
        User.create(data)
        .then(data =>
        {
            return res.status(201).json({id : data.id, email : data.email});
        })
        .catch(err =>
        {
            console.log(err);
            return res.status(500).json({error : "Internal Server Error"})
        })
    });

router.post("/login", (req, res) =>
    {
        let {email, password} = req.body;

        User.findOne({where : {email}})
        .then(data =>
        {
            if(!data)
                return res.status(404).json({error : "Invalid email/password"});
            if(!decrypt(password, data.password))
                return res.status(404).json({error : "Invalid email/password"});
            
            let token = generateToken(data.id);
            req.headers.token = token;
            return res.status(200).json({access_token : token});
        })
        .catch(err => 
        {
            return res.status(500).json({error : "Internal Server Error"});
        })
    });
// router.use(authentication);
router.use((req, res, next) =>
    {
        
    });
    
router.post("/foods", (req,res) =>
    {
        let {title, price, ingredients, tag} = req.body;
        let data = {title, price, ingredients, tag};
        
        Food.create(data)
        .then(value =>
        {
            return res.status(201).json(
                {
                    id : value.id,
                    title : value.title,
                    price : value.price,
                    ingredients : value.ingredients,
                    tag : value.tag,
                    UserId : value.UserId
                }
            )
        })
        .catch(err =>
        {
            console.log(err)
            return res.status(500).json({error : "Internal Server Error"});
        })
    })

module.exports = router;