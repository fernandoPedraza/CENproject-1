angular.module('users').controller('UsersController', ['$scope', '$window', 'Users',
  function($scope, $window, Users) {
      $scope.flashMessage = undefined;
      $scope.noUsername = undefined;
      $scope.noPassword = undefined;
      $scope.noEmail = undefined;

      $scope.registerUser = function() {
        /**TODO
        *Save the article using the Listings factory. If the object is successfully
        saved redirect back to the list page. Otherwise, display the error
       */
        $scope.noUsername = 'This field is required'
        $scope.noPassword = 'This field is required'
        $scope.noEmail = 'This field is required'

        if ($scope.newUser == undefined) {
          return;
        }

        var usernameEntered = $scope.newUser.username != undefined && $scope.newUser.username != "";
        var emailEntered = $scope.newUser.email != undefined && $scope.newUser.email != "";
        var passwordEntered = $scope.newUser.password != undefined && $scope.newUser.password != "";

        var allLoginInfoEntered = true;
        if (usernameEntered) {
          $scope.noUsername = undefined;
        } else { allLoginInfoEntered = false; }
        if (passwordEntered) {
          $scope.noPassword = undefined;
        } else { allLoginInfoEntered = false; }
        if (emailEntered) {
          $scope.noEmail = undefined;
        } else { allLoginInfoEntered = false; }

        if (!allLoginInfoEntered) {
          return;
        }

        $scope.noUsername = undefined;
        $scope.noPassword = undefined;
        $scope.noEmail = undefined;

          obj = {
              'username': $scope.newUser.username,
              'email': $scope.newUser.email,
              'password': $scope.newUser.password
          };

          Users.registerUser(obj).then(function(response) {
            if (response.data.success) {
              $window.location.href = "/";
            } else {
              var errmsg = response.data.msg;
              if (errmsg.includes("$username")) {
                $scope.flashMessage = "Registration failed, this username is taken, please try again"
              } else if (errmsg.includes("$email")) {
                $scope.flashMessage = "Registration failed, this email has already been used, please try again"
              } else {
                $scope.flashMessage = "Registration Failed"
              }
            }
          }, function(error) {
              if (error) { console.log('Unable to add listing:', error);}
          });
      };

      $scope.loginUser = function() {
        $scope.noUsername = 'This field is required'
        $scope.noPassword = 'This field is required'
        $scope.noEmail = 'This field is required'

        if ($scope.user == undefined) {
          return;
        }

        var usernameEntered = $scope.user.username != undefined && $scope.user.username != "";
        var emailEntered = $scope.user.email != undefined && $scope.user.email != "";
        var passwordEntered = $scope.user.password != undefined && $scope.user.password != "";

        var allLoginInfoEntered = true;
        if (usernameEntered) {
          $scope.noUsername = undefined;
        } else { allLoginInfoEntered = false; }
        if (passwordEntered) {
          $scope.noPassword = undefined;
        } else { allLoginInfoEntered = false; }

        if (!allLoginInfoEntered) {
          return;
        }

        $scope.noUsername = undefined;
        $scope.noPassword = undefined;

        obj = {
            "username": $scope.user.username,
            "password": $scope.user.password
        };

        Users.loginUser(obj).then(function(response) {
          if (response.data.success) {
            $window.location.href = "/";
            $window.token.jwt = response.data.token;
          } else {
            $scope.flashMessage = "Login Failed: " + response.data.msg;
          }
          console.log(response)
        }, function(error) {
            console.log('Unable to login:', error);
        });
      };

  }
]);
