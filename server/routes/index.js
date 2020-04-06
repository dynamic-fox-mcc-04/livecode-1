const router = require("express").Router();
const {User, Food} = require("../models");
const {decrypt} = require("../helpers/bcrypt");
const {generateToken} = require("../helpers/jwt");
const {authentication} = require("../middlewares/authentication");

router.post("/register", (req, res, next) =>
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
            // console.log(err);
            return next(err);
            return res.status(500).json({error : "Internal Server Error"})
        })
    });

router.post("/login", (req, res, next) =>
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
            // console.log(req.headers);
            // let id = verify(req.headers.token);
            // console.log(id)
            return res.status(200).json({access_token : token});
        })
        .catch(err => 
        {
            return next(err);
            return res.status(500).json({error : "Internal Server Error"});
        })
    });

router.use(authentication);

router.post("/foods", (req, res, next) =>
    {
        let {title, price, ingredients, tag} = req.body;
        let user_id = req.user_id;
        let data = {title, price, ingredients, tag, UserId : user_id};
        // console.log(req.user_id)
        Food.create(data)
        .then(value =>
        {
            // return res.status(201).json(value);
            return res.status(201).json(
                {
                    id : value.id,
                    title : value.title,
                    price : value.price,
                    ingredients : value.ingredients,
                    tag : value.tag,
                    UserId : value.UserId
                });
        })
        .catch(err =>
        {
            // console.log(err)
            return next(err);
            return res.status(500).json({error : "Internal Server Error"});
        })
    });

router.get("/foods", (req, res, next) =>
    {
        let UserId = String(req.user_id);
        Food.findAll({where : {UserId}})
        .then(data =>
        {
            return res.status(201).json(data)
        })
        .catch(err =>
        {
            // return res.status(500).json(err);
            return next(err);
            return res.status(500).json({error : "Internal Server Error"});
        })
    });

router.delete("/foods/:id", (req, res, next) =>
    {
        let {id} = req.params;
        Food.destroy({where : {id}})
        .then(data =>
        {
            res.status(200).json({ "message": "Successfully delete food from your menu" });
        })
        .catch(err =>
        {
            return next(err);
            return res.status(500).json({error : "Internal Server Error"});
        })
    })

module.exports = router;