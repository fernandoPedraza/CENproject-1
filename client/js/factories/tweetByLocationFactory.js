angular.module('tweet_by_location', []).factory('Data', function($http, $window) {
  
  const token = $window.localStorage.getItem('token');
  // uncomment if you want to run locally
  // var methods = {
  //   getTweetsByLocation: function(location) {
  //     return $http.post('http://localhost:8080/api/tweets_by_location', location, {
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     });
  //   },
  //   getTrendsByLocation: function(location) {
  //     return $http.post('http://localhost:8080/api/trends_by_location', location, {
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     });
  //   },
  // };

  // uncomment if you want to run on heroku
  var methods = {
    getTweetsByLocation: function(location) {
      return $http.post('https://pumpkin-tart-18443.herokuapp.com/api/tweets_by_location', location, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    },
    getTrendsByLocation: function(location) {
      return $http.post('https://pumpkin-tart-18443.herokuapp.com/api/trends_by_location', location, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    },
  };

  return methods;
});
