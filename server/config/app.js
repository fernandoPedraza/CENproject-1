var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

module.exports.start = function() {
    var app = express.init();
    //app.listen(config.port, function() {
    //console.log('App listening on port', config.port);
    //});
    app.listen(process.env.PORT || 3000, function() {
        console.log("Express server listening on port %d in %s mode", this.address.port, app.settings.env);
    });
};