angular.module('tweet_by_location', []).factory('Data', function($http) {
  var methods = {
    getTweetsByLocation: function(location) {
      return $http.post('http://localhost:8080/api/tweets_by_location', location);
    },
    getTrendsByLocation: function(location) {
      return $http.post('http://localhost:8080/api/trends_by_location', location);
    },
  };
  return methods;
});
