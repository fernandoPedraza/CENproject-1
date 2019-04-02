var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

module.exports.start = function() {
    var app = express.init();
    // uncomment if you want to run locally
    // app.listen(config.port, function() {
    //     console.log('App listening on port', config.port);
    // });

    // uncomment if you want it to work with heroku
    app.listen(process.env.PORT || 3000, function() {
        console.log("Express server listening on port %d in %s mode", this.address.port, app.settings.env);
    });
};