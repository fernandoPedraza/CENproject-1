/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var topicSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  tweets: [],
  date: Date
})

/* Use your schema to instantiate a Mongoose model */
var Topic = mongoose.model('Topic', topicSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Topic;
