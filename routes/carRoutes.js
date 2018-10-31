const router = require('express-promise-router')();

const carsController = require('../controllers/carsController');
const { 
    validateBody,
    validateParam,
    schemas 
} = require('../helpers/routeHelpers');

router.route('/')
    .get(carsController.index)
    .post(validateBody(schemas.carUserSchema), carsController.newCar);

module.exports = router;