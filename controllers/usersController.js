const userModel = require('../models/userModel');

module.exports = {
    index: (req, res, next) => {
        user.find({})
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            });
    },

    newUser: (req, res, next) => {
        let newUser = new userModel(req.body);
        newUser.save()
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            });
    }
};