/* Dependencies */
var data = require('../controllers/twitter.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/global_topics')
  .get(data.getGlobalTopics);

router.route('/top_tweets')
  .get(data.getTopTweets);

module.exports = router;
