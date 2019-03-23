angular.module('data', []).factory('Data', function($http) {
  var methods = {
    getGlobalTopics: function() {
      return $http.get('http://localhost:8080/api/global_topics');
    },
    getTopTweets: function() {
      return $http.get('http://localhost:8080/api/top_tweets');
    }
  };

  return methods;
});
