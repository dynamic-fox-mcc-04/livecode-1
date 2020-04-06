const {Food, User} = require('../models')

class FoodCtrl {

    static getAll(req, res, next) {
        console.log("FETCH ALL FOODS");
        return Food.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(response => {
            console.log("FOODS FETCHED");
            return res.status(200).json(response)
        })
        .catch(err => {
            console.log("ERROR FETCH ALL");
            return res.status(500).json({message: 'INTERNAL SERVER ERROR'})
        })
    }


    static getOne(req, res, next) {
        console.log("FETCH ONE BY ID");
        return Food.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(response => {
            if(response) {
                console.log("ONE FOOD FETCHED");
                return res.status(200).json(response)
            } else {
                console.log("NOT FOUND");
                return res.status(404).json({message: 'NOT FOUND'})
            }
            
        })
        .catch(err => {
            console.log("ERROR FETCH ONE");
            return res.status(500).json({message: 'INTERNAL SERVER ERROR'})
        })
    }


    static add(req, res, next) {
        console.log(">>> ADD FOOD");
        console.log(req.body);

        Food.create({
            title: req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            UserId: req.decoded.id
        })
        .then(response => {
            console.log("FOOD ADDED TO LIST");
            return res.status(201).json(response)
        })
        .catch(err => {
            console.log("ERROR ADD FOOD");
            return res.status(400).json({message: 'BAD REQUEST'})
        })
    }


    static drop(req, res, next) {
        console.log("DROPPING ONE FOOD FROM MENU");
        Food.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(response => {
            console.log("FOOD DROPPED");
            res.status(200).json({message: 'Successfully delete food from your menu'})
        })
        .catch(err => {
            console.log("ERROR DELETE ONE");
            return res.status(400).json({message: 'BAD REQUEST'})
        })
    }

}

module.exports = FoodCtrl