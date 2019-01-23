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

router.route('/:carId')
    .get(validateParam(schemas.idSchema, 'carId'), carsController.getCar)
    .patch([validateParam(schemas.idSchema, 'carId'), validateBody(schemas.carOptionalSchema)], carsController.updateCar)
    .put([validateParam(schemas.idSchema, 'carId'), validateBody(schemas.carSchema)], carsController.replaceCar)
    .delete(validateParam(schemas.idSchema, 'carId'), carsController.deleteCar);

module.exports = router;