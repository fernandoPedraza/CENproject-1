angular.module('data', []).factory('Data', function($http) {
  var methods = {
    getGlobalTopics: function() {
      return $http.get('http://localhost:8080/api/global_topics');
    },
    getTopTweets: function() {
      return $http.get('http://localhost:8080/api/top_tweets');
    },
    getEmbeddedTweet: function(url) {
      return $http.post('http://localhost:8080/api/embedded_tweet', url);
    },
    getTweetsByTopic: function(topic) {
      return $http.post('http://localhost:8080/api/tweets_by_topic', topic);
    },
  };

  return methods;
});
