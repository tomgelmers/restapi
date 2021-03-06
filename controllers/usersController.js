const userModel = require('../models/userModel');
const carsController = require('./carsController');



module.exports = {
    index: async (req, res, next) => {
        let users = await userModel.find({});
        res.status(200).json(users);
    },

    newUser: async (req, res, next) => {
        console.log('req.value', req.value);
        let newUser = new userModel(req.value.body);
        let user = await newUser.save();
        res.status(201).json(user); 
    },

    getUser: async (req, res, next) => {
        let { userId } = req.value.params;
        let user = await userModel.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req, res, next) => {
        let { userId } = req.value.params;
        let newUser = req.value.body;
        await userModel.findByIdAndUpdate(userId, newUser);

        res.status(200).json({success: true});
    },

    updateUser: async (req, res, next) => {
        let { userId } = req.value.params;
        let newUser = req.value.body;
        await userModel.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    deleteUser: async (req, res, next) => {
        let { userId } = req.value.params;
        await userModel.findByIdAndRemove(userId);
        res.status(200).json({ success: true });
    },

    getUserCars: async (req, res, next) => {
        let { userId } = req.value.params;
        let user = await userModel.findById(userId).populate('cars');
        res.status(200).json( user.cars );
    },

    newUserCar: async (req, res, next) => {
        let { userId } = req.value.params;
        let user = await userModel.findById(userId);
        let newCar = await carsController.newUserCar(req.value.body, user);

        user.cars.push(newCar._id);
        await user.save();
        res.status(201).json(newCar);
    }
};