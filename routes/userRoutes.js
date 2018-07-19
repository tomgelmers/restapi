const express = require('express');
const router = require('express-promise-router')();

const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.index)
    .post(usersController.newUser);

module.exports = router;