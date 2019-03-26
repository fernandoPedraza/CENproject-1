/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    twitterUser = require('twitterUser.server.model.js');

var tweetSchema = new Schema({
  tweet: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  date: Date,
  owner: twitterUser
})

/* Use your schema to instantiate a Mongoose model */
var Tweet = mongoose.model('Tweet', tweetSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Tweet;
