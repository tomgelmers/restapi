const carModel = require('../models/carModel');
const userModel = require('../models/userModel');
const self = this;

module.exports = {
    index: async (req, res, next) => {
        let cars = await carModel.find({});
        res.status(200).json(cars);
    },

    getCar: async(req, res, next) => {
        let { carId } = req.value.params;        
        let car = await carModel.findById(carId);
        res.status(200).json(car);
    },

    updateCar: async(req, res, next) => {
        let { carId } = req.value.params;
        let newCar = req.value.body;
        await carModel.findByIdAndUpdate(carId , newCar);
        res.status(200).json({success: true});
    },

    deleteCar: async(req, res, next) => {
        let { carId } = req.value.params;
        await carModel.findByIdAndDelete(carId);
        res.status(200).json({success: true});
    },

    replaceCar: async(req, res, next) => {
        let {carId} = req.value.params;
        let newCar = req.value.body;
        await carModel.findByIdAndUpdate(carId, newCar);
        res.status(200).json({success: true});
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