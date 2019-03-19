var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    registerUserRouter = require('../routes/users.server.routes');

module.exports.init = function() {
    //connect to database
    mongoose.connect(config.db.uri);

    //initialize app
    var app = express();

    // enable CORS
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    })

    //enable request logging for development debugging
    app.use(morgan('dev'));

    //body parsing middleware
    app.use(bodyParser.json());


    /**TODO
    Serve static files */
    app.use(express.static(path.join(__dirname, '../../client')));


    /**TODO
    Use the listings router for requests to the api */
    app.use('/api/listings', listingsRouter);

    /* Use the login user router when directed to the /login page */
    // app.use('/login', loginUserRouter);
    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/login.html'));
    });
    /* Use the register user router when directed to the /register page */
    app.use('/', registerUserRouter);
    app.get('/register', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/registerUser.html'));
    });

    /*Go to homepage for all routes not specified */
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/index.html'));
    });

    return app;
};
