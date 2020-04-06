const {Food, User} = require('../models')
const {customError} = require('../helpers/customError')

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
            next(err)
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
                throw new customError(404, 'NOT FOUND')
            }
            
        })
        .catch(err => {
            console.log("ERROR FETCH ONE");
            next(err)
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
            next(err)
        })
    }


    static drop(req, res, next) {
        console.log("DROPPING ONE FOOD FROM MENU");
        return Food.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(response  => {
            if(response) {

                console.log("food found");
                return Food.destroy({
                    where: {
                        id: req.params.id
                    }
                })

            } else {
                throw new customError(404, 'NOT FOUND')
            }
        })
        .then(response => {
            console.log("FOOD DROPPED");
            res.status(200).json({message: 'Successfully delete food from your menu'})
        })
        .catch(err => {
            console.log("ERROR DELETING FOOD");
            next(err)
        })
    }

}

module.exports = FoodCtrl