angular.module('users', []).factory('Users', function($http) {
  var methods = {
  	registerUser: function(user) {
        return $http.post('http://localhost:8080/auth/register', user);
    },
    loginUser: function(user) {
        return $http.post('http://localhost:8080/auth/login', user);
    }
  };

  return methods;
});
