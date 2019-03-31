google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['locationApp']);
});

angular.module('tweet_by_location').controller('TweetByLocationController', ['$scope', '$window', 'Data',
  function($scope, $window, Data) {
    $scope.currentLocation = undefined;
    
    if (!$window.localStorage.getItem('token')) {
      $window.location.href = '/users';
    }

    if ($window.localStorage.getItem('topic')) {
      $window.localStorage.removeItem('topic');
    }

    $scope.tweetsByLocation = undefined;
    $scope.trendsByLocation = undefined;
    if ($window.localStorage.getItem('location')) {
      // must be coming from the home page
      var location = { location: $window.localStorage.getItem('location') };
      $scope.currentLocation = location.location;
      Data.getTweetsByLocation(location).then(function(response) {
        if (response.data.notAuthorized) {
          $window.location.href = '/users';
        }
        if (response.data.success) {
          $scope.currentLocation = response.data.locationFound;
        }
        if (response.data.success && response.data.tweets.length > 0) {
          $scope.tweetsByLocation = [];
          var tweets = response.data.tweets;
          for (i = 0; i < tweets.length; ++i) {
            // removing sublinks ... might not be necessary 
            var httpsIndex = tweets[i].full_text.indexOf('https://');
            if (httpsIndex != -1) {
              tweets[i].link = tweets[i].full_text.substring(httpsIndex,);
              tweets[i].full_text = tweets[i].full_text.substring(0, httpsIndex);
            }
            $scope.tweetsByLocation.push(tweets[i]);
          }
        }
      });
      Data.getTrendsByLocation(location).then(function(response) {
        if (response.data.success && response.data.trending_topics.length > 0) {
          $scope.trendsByLocation = []
          var trends = response.data.trending_topics;
           // Create the data table.
          var rows = [['Name', 'Volume', { role: 'style' }]];
          var max = 20;
          for (var i = 0; i < max; i++) {
            if (trends[i].tweet_volume <= 0) {
              max += 1;
              continue
            }
            var trend = [trends[i].name, trends[i].tweet_volume, 'fill-color: #80ccff'];
            rows.push(trend);
          }
          var data = google.visualization.arrayToDataTable(rows);

          // Set chart options
          var options = {'title':'Tweet volume for trending topics',
                          'width':$window.innerWidth - 50,
                          'height':400,
                          'legend':{'position':'none'}
                        };

          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
          chart.draw(data, options);

          for (i = 0; i < 9; ++i) {
            $scope.trendsByLocation.push(trends[i]);
          }
        }
      });
    } 

    $scope.searchForLocation = function() {
      var location = $scope.locationQuery;
      $window.localStorage.setItem('location', location);
    } 

    $scope.searchTopic = function(index) {
      var topic = $scope.trendsByLocation[index];
      // store the index
      $window.localStorage.setItem('topic', JSON.stringify(topic));
      $window.location.href = '/searchbytopic';
    }

    $scope.logout = function() {
      $window.localStorage.clear();
      $window.location.href = '/users';
    };
  }
]);
