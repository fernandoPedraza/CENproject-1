angular.module('tweet_by_topic', []).factory('Data', function($http, $window) {

  const token = $window.localStorage.getItem('token');
  var methods = {
    getTweetsByTopic: function(topic) {
      return $http.post('http://localhost:8080/api/tweets_by_topic', topic, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    },
  };
  return methods;
});
