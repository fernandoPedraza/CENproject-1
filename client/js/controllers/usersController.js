angular.module('users').controller('UsersController', ['$scope', 'Users',
    function($scope, Users, $sha1) {

        $scope.registerUser = function() {
          /**TODO
          *Save the article using the Listings factory. If the object is successfully
          saved redirect back to the list page. Otherwise, display the error
         */
            obj = {
                "username": $scope.newUser.username,
                "email": $scope.newUser.email,
                "password": $scope.newUser.password
            };

            Users.registerUser(obj).then(function(response) {
            }, function(error) {
                console.log('Unable to add listing:', error);
            });
        };

        $scope.loginUser = function() {
          if ($scope.user == undefined) {
            console.log('no params')
          }
          if ($scope.user.username == undefined || $scope.user.username == "") {
            console.log('no username')
          }
          if ($scope.user.password == undefined || $scope.user.password == "") {
            console.log('no password')
          }

          obj = {
              "username": $scope.user.username,
              "password": $scope.user.password
          };

          console.log(obj);

          Users.loginUser(obj).then(function(response) {
            console.log(response)
          }, function(error) {
              console.log('Unable to login:', error);
          });
        };

    }
]);
