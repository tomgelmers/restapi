const carModel = require('../models/carModel');

module.exports = {
    newUserCar: async (body, seller) => {
        let newCar = new carModel(body);
        newCar.seller = seller;
        let car = await newCar.save();
        return car;
    }
}