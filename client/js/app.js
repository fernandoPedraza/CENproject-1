/* register the modules the application depends upon here*/
angular.module('listings', []);


/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['listings']);

angular.module('users', []);
var app2 = angular.module('usersApp', ['users']);

angular.module('data', [])
var app3 = angular.module('tweetApp', ['data']);
