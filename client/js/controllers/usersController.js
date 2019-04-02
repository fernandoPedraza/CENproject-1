angular.module('users').controller('UsersController', ['$scope', '$window', 'Users',
  function($scope, $window, Users) {
    $scope.flashMessageRegister = undefined;
    $scope.flashMessageLogin = undefined;
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
      $scope.flashMessageRegister = undefined;
      $scope.flashMessageLogin = undefined;
      /**TODO
      *Save the article using the Listings factory. If the object is successfully
      saved redirect back to the list page. Otherwise, display the error
     */
      $scope.noUsername = 'This field is required';
      $scope.noPassword = 'This field is required';
      $scope.noConfirmPassword = 'This field is required';
      $scope.noEmail = 'This field is required';
      $scope.noConfirmEmail = 'This field is required';
      $scope.noPasswordMatch = 'Passwords must match';
      $scope.noEmailMatch = 'Emails must match';
      $scope.notValidEmail = 'Please enter a valid email address';

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
      var validEmail = false;

      if (emailEntered && confirmEmailEntered) {
        if ($scope.register.confemail == $scope.register.email) {
          emailsMatch = true;
          if (validateEmail($scope.register.email)) {
            validEmail = true;
          } else allLoginInfoEntered = false;
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

      if (validEmail) {
        $scope.notValidEmail = undefined;
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
          if (response.data.success) {
            $window.location.href = "/";
            $window.localStorage.setItem('token', response.data.token);
            $window.localStorage.setItem('username', response.data.username);
          } else {
            $scope.flashMessageRegister = "Registration failed";
          }
        }, function(error) {
            if (error) { console.log('Unable to add listing:', error); }
        });
    };

    $scope.loginUser = function() {
      $scope.flashMessageRegister = undefined;
      $scope.flashMessageLogin = undefined;
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
          $window.localStorage.setItem('username', response.data.username);
        } else {
          $scope.flashMessageLogin = "Login failed"; 
        }
      }, function(error) {
          console.log('Unable to login:', error);
      });
    };

    var validateEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
]);