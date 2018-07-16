const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.index)
    .post(usersController.newUser);

module.exports = router;