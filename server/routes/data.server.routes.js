/* Dependencies */
var data = require('../controllers/twitter.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/global_topics')
  .get(data.getGlobalTopics);

router.route('/top_tweets')
  .get(data.getTopTweets);

router.route('/embedded_tweet')
  .post(data.getEmbeddedTweet);

router.route('/tweets_by_topic')
  .post(data.getTweetsByTopic);

router.route('/tweets_by_location')
  .post(data.getTweetsByLocation);

router.route('/trends_by_location')
  .post(data.getTrendsByLocation);

module.exports = router;