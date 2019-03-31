var path = require('path'),
    express = require('express'),
    expressValidator = require('express-validator'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    cors = require('cors'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jwt = require('express-jwt'),
    config = require('./config'),
    userAuthRouter = require('../routes/userAuth.server.routes'),
    dataRouter = require('../routes/data.server.routes');


module.exports.init = function() {
    //connect to database
    mongoose.connect(config.db.uri);

    //initialize app
    var app = express();

    // enable CORS
    app.use(cors());

    //enable request logging for development debugging
    app.use(morgan('dev'));

    //body parsing middleware
    app.use(bodyParser.json());

    // Serve static files
    app.use(express.static(path.join(__dirname, '../../client')));

    // Assign routers
    app.use('/api', dataRouter);
    app.use('/auth', userAuthRouter);

    app.get('/users', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/signin.html'));
    });

    app.get('/searchbytopic', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/search-topic.html'));
    });

    app.get('/searchbylocation', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/search-location.html'));
    });
    /*Go to homepage for all routes not specified */
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/index.html'));
    });

    return app;
};