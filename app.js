const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = app.get('port') || 3000;
const db = app.get('db') || 'mongodb://localhost:27017/restapi';

//Routes
const usersRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');

//Database connection
mongoose.connect(db, { useNewUrlParser: true });

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routing
app.use('/users', usersRoutes);
app.use('/cars', carRoutes);
app.use('/', function(req, res) {
    res.redirect('/cars');
})

//Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
    let error = app.get('env') === 'development' ? err : {};
    let status = err.status || 500;

    //Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    //Respond to log
    console.error(err);
});

//Start server
app.listen(port, () => console.log("server is listening on ", port));