angular.module('users').controller('UsersController', ['$scope', '$window', 'Users',
  function($scope, $window, Users) {
    $scope.flashMessage = undefined;
    $scope.noUsername = undefined;
    $scope.noPassword = undefined;
    $scope.noEmail = undefined;
    $scope.noConfirmEmail = undefined;
    $scope.noConfirmPassword = undefined;
    $scope.noLogUsername = undefined;
    $scope.noLogPassword = undefined;
    $scope.noPasswordMatch = undefined;
    $scope.noEmailMatch = undefined;

    $scope.registerUser = function() {
      /**TODO
      *Save the article using the Listings factory. If the object is successfully
      saved redirect back to the list page. Otherwise, display the error
     */
      $scope.noUsername = 'This field is required'
      $scope.noPassword = 'This field is required'
      $scope.noConfirmPassword = 'This field is required'
      $scope.noEmail = 'This field is required'
      $scope.noConfirmEmail = 'This field is required'
      $scope.noPasswordMatch = 'Passwords must match'
      $scope.noEmailMatch = 'Emails must match'

      if ($scope.register == undefined) {
        $scope.noPasswordMatch = undefined;
        $scope.noEmailMatch = undefined;
        return;
      }

      var usernameEntered = $scope.register.username != undefined && $scope.register.username != "";
      var emailEntered = $scope.register.email != undefined && $scope.register.email != "";
      var confirmEmailEntered = $scope.register.confemail != undefined && $scope.register.confemail != "";
      var passwordEntered = $scope.register.password != undefined && $scope.register.password != "";
      var confirmPasswordEntered = $scope.register.confpassword != undefined && $scope.register.confpassword != "";

      var allLoginInfoEntered = true;
      if (usernameEntered) {
        $scope.noUsername = undefined;
      } else { allLoginInfoEntered = false; }
      if (passwordEntered) {
        $scope.noPassword = undefined;
      } else { allLoginInfoEntered = false; }
      if (confirmPasswordEntered) {
        $scope.noConfirmPassword = undefined;
      } else { allLoginInfoEntered = false; }
      if (emailEntered) {
        $scope.noEmail = undefined;
      } else { allLoginInfoEntered = false; }
      if (confirmEmailEntered) {
        $scope.noConfirmEmail = undefined;
      } else { allLoginInfoEntered = false; }

      // Check for matching emails and passwords
      var emailsMatch = false;
      var passwordsMatch = false;

      if (emailEntered && confirmEmailEntered) {
        if ($scope.register.confemail == $scope.register.email) {
          emailsMatch = true;
        } else {
          allLoginInfoEntered = false;
        }
      } else emailsMatch = true;

      if (passwordEntered && confirmPasswordEntered) {
        if ($scope.register.confpassword == $scope.register.password) {
          passwordsMatch = true
        } else {
          allLoginInfoEntered = false;
        }
      } else passwordsMatch = true;

      if (emailsMatch) {
        $scope.noEmailMatch = undefined;
      }

      if (passwordsMatch) {
        $scope.noPasswordMatch = undefined;
      }

      if (!allLoginInfoEntered) {
        return;
      }

      obj = {
          'username': $scope.register.username,
          'email': $scope.register.email,
          'password': $scope.register.password
      };

        Users.registerUser(obj).then(function(response) {
          console.log(response);
          if (response.data.success) {
            $window.location.href = "/";
            $window.localStorage.setItem('token', response.data.token);
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
      $scope.noLogUsername = 'This field is required'
      $scope.noLogPassword = 'This field is required'

      if ($scope.login == undefined) {
        return;
      }

      var usernameEntered = $scope.login.username != undefined && $scope.login.username != "";
      var passwordEntered = $scope.login.password != undefined && $scope.login.password != "";

      var allLoginInfoEntered = true;
      if (usernameEntered) {
        $scope.noLogUsername = undefined;
      } else { allLoginInfoEntered = false; }
      if (passwordEntered) {
        $scope.noLogPassword = undefined;
      } else { allLoginInfoEntered = false; }

      if (!allLoginInfoEntered) {
        return;
      }

      obj = {
          "username": $scope.login.username,
          "password": $scope.login.password
      };

      Users.loginUser(obj).then(function(response) {
        if (response.data.success) {
          $window.location.href = "/";
          $window.localStorage.setItem('token', response.data.token);
        } else {
          $scope.flashMessage = "Login Failed: " + response.data.msg;
        }
      }, function(error) {
          console.log('Unable to login:', error);
      });
    };
  }
]);
