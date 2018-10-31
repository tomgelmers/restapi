const carModel = require('../models/carModel');
const userModel = require('../models/userModel');
const self = this;

module.exports = {
    index: async (req, res, next) => {
        let cars = await carModel.find({});
        res.status(200).json(cars);
    },

    newCar: async (req, res, next) => {
        let seller = await userModel.findById(req.body.seller);
        let newCarBody = req.body;
        delete newCarBody.seller;
        let newCar = await module.exports.newUserCar(newCarBody, seller);
        
        seller.cars.push(newCar._id);
        await seller.save();

        res.status(201).json(newCar);
    },

    newUserCar: async (body, seller) => {
        let newCar = new carModel(body);
        newCar.seller = seller;
        let car = await newCar.save();
        return car;
    }
}