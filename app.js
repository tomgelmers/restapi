const express = require('express');
const morgan = require('morgan');

const app = express();
const port = app.get('port') || 3000;

//Middlewares
app.use(morgan('dev'));

//Routing
app.get('/', (req,res, next) => {
    res.status(200).json({
        message: 'You requested index'
    });
});

//Catch 404 errors and forward them to error handler
app.use((req, resp, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, resp, next) => {
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