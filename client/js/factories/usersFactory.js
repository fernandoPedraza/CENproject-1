angular.module('users', []).factory('Users', function($http) {
  // uncomment if you want to run locally
  // var methods = {
  // 	registerUser: function(user) {
  //       return $http.post('http://localhost:8080/auth/register', user);
  //   },
  //   loginUser: function(user) {
  //       return $http.post('http://localhost:8080/auth/login', user);
  //   }
  // };

  // uncomment if you want to run on heroku
  var methods = {
  	registerUser: function(user) {
        return $http.post('https://pumpkin-tart-18443.herokuapp.com/auth/register', user);
    },
    loginUser: function(user) {
        return $http.post('https://pumpkin-tart-18443.herokuapp.com/auth/login', user);
    }
  };

  return methods;
});