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
    config = require('./config'),
    userAuthRouter = require('../routes/users.server.routes'),
    dataRouter = require('../routes/data.server.routes');

module.exports.init = function() {
    //connect to database
    mongoose.connect(config.db.uri);

    //initialize app
    var app = express();

    app.use(passport.initialize());
    app.use(passport.session());

    // enable CORS
    app.use(cors());

    //enable request logging for development debugging
    app.use(morgan('dev'));

    //body parsing middleware
    app.use(bodyParser.json());
    //app.use(expressValidator());

    //app.use(cookieParser());
    //// Managing sessions
    //app.use(session({
    //  secret: 'keyboard cat',
    //  resave: false,
    //  saveUninitialized: false,
//
    //}))

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
