/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var twitterUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: false
  }
});

/* Use your schema to instantiate a Mongoose model */
var TwitterUser = mongoose.model('TwitterUser', twitterUserSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = TwitterUser;
