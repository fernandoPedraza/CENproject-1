var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    userAuthRouter = require('../routes/users.server.routes'),
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

    /* Serve static files */
    app.use(express.static(path.join(__dirname, '../../client')));

    /* Use the userAuth router when directed to the /login page */
    app.use('/login', userAuthRouter);
    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/login.html'));
    });

    /* Use the userAuth router when directed to the /register page */
    app.use('/register', userAuthRouter);
    app.get('/register', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/registerUser.html'));
    });

    /* Use the data router for requests to the API */
    app.use('/api', dataRouter);

    /*Go to homepage for all routes not specified */
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/index.html'));
    });

    return app;
};
