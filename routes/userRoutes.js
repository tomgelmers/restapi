const express = require('express');
const router = require('express-promise-router')();

const usersController = require('../controllers/usersController');
const { validateParam, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(usersController.index)
    .post(usersController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), usersController.getUser)
    .put(validateParam(schemas.idSchema, 'userId'), usersController.replaceUser)
    .patch(validateParam(schemas.idSchema, 'userId'), usersController.updateUser)
    .delete(validateParam(schemas.idSchema, 'userId'), usersController.deleteUser);

router.route('/:userId/cars')
    .get(validateParam(schemas.idSchema, 'userId'), usersController.getUserCars)
    .post(validateParam(schemas.idSchema, 'userId'), usersController.newUserCar);
module.exports = router;