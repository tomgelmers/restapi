const userModel = require('../models/userModel');

module.exports = {
    index: async (req, res, next) => {
        let users = await userModel.find({});

        if(users) {
            res.status(200).json(users);
        }
    },

    newUser: async (req, res, next) => {
        let newUser = new userModel(req.body);
        let user = await newUser.save();
        res.status(201).json(user); 
    }
};