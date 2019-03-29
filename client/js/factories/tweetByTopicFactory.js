angular.module('tweet_by_topic', []).factory('Data', function($http) {
  var methods = {
    getTweetsByTopic: function(topic) {
      return $http.post('http://localhost:8080/api/tweets_by_topic', topic);
    },
  };
  return methods;
});
