angular.module('data', []).factory('Data', function($http, $window) {

  const token = $window.localStorage.getItem('token');
  // uncomment if you want to run locally
  var methods = {
    getGlobalTopics: function() {
      return $http.get('http://localhost:8080/api/global_topics', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    },
    getTopTweets: function() {
      return $http.get('http://localhost:8080/api/top_tweets', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    },
    getEmbeddedTweet: function(url) {
      return $http.post('http://localhost:8080/api/embedded_tweet', url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    },
  };

  // uncomment if you want to run on heroku
  // var methods = {
  //   getGlobalTopics: function() {
  //     return $http.get('https://pumpkin-tart-18443.herokuapp.com/api/global_topics', {
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     });
  //   },
  //   getTopTweets: function() {
  //     return $http.get('https://pumpkin-tart-18443.herokuapp.com/api/top_tweets', {
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     });
  //   },
  //   getEmbeddedTweet: function(url) {
  //     return $http.post('https://pumpkin-tart-18443.herokuapp.com/api/embedded_tweet', url, {
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     });
  //   },
  // };
  return methods;
});