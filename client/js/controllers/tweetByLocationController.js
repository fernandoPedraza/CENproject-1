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

    $scope.trendsByLocation = undefined;
    if ($window.localStorage.getItem('location')) {
      var location = { location: $window.localStorage.getItem('location') };
      $scope.currentLocation = location.location;
      Data.getTrendsByLocation(location).then(function(response) {
        console.log(response);
        if (response.data.success && response.data.trending_topics.length > 0) {
          $scope.currentLocation = response.data.location_found;
          $scope.trendsByLocation = []
          var trends = response.data.trending_topics;
           // Create the data table.
          var rows = [['Name', 'Volume', { role: 'style' }]];
          var max;
          if (trends.length > 20) {
            max = 20;
          } else {
            max = trends.length
          }
          for (var i = 0; i < max; i++) {
            $scope.trendsByLocation.push(trends[i]);
            if (trends[i].tweet_volume <= 0) {
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
        }
      });
    }

    $scope.searchForLocation = function() {
      var location = $scope.locationQuery;
      $window.localStorage.setItem('location', location);
    }

    $scope.searchTopic = function(index) {
      var topic = $scope.trendsByLocation[index];
      $window.localStorage.setItem('topic', JSON.stringify(topic));
      $window.location.href = '/searchbytopic';
    }

    $scope.logout = function() {
      $window.localStorage.clear();
      $window.location.href = '/users';
    };
  }
]);
