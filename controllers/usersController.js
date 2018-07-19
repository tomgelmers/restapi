const userModel = require('../models/userModel');
const carModel = require('../models/carModel');



module.exports = {
    index: async (req, res, next) => {
        let users = await userModel.find({});
        res.status(200).json(users);
    },

    newUser: async (req, res, next) => {
        let newUser = new userModel(req.body);
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
        let newUser = req.body;
        await userModel.findByIdAndUpdate(userId, newUser);

        res.status(200).json({success: true});
    },

    updateUser: async (req, res, next) => {
        let { userId } = req.value.params;
        let newUser = req.body;
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
        let newCar = new carModel(req.body);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar);
    }
};