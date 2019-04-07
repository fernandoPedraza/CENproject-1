google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['locationApp']);
});

angular.module('tweet_by_location').controller('TweetByLocationController', ['$scope', '$window', 'Data',
  function($scope, $window, Data) {

    if (!$window.localStorage.getItem('token')) {
      $window.location.href = '/users';
    }

    if ($window.localStorage.getItem('topic')) {
      $window.localStorage.removeItem('topic');
    }

    if ($window.localStorage.getItem('location')) {
      var location = { location: $window.localStorage.getItem('location') };
      $scope.currentLocation = location.location;
      Data.getTrendsByLocation(location).then(function(response) {
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
            var rows = [['Name', 'Volume', { role: 'style' }]];
            var max;
            if (trends.length > 20) {
              max = 20;
            } else {
              max = trends.length
            }
            for (var c = 0, i = 0; i < max; i++,c++) {
              $scope.trendsByLocation.push(trends[i]);
              if (trends[i].tweet_volume <= 0) {
                c--;
                continue
              }
                var trend;
                if (c % 2 == 0)
                  trend = [trends[i].name, trends[i].tweet_volume, 'fill-color: #038de2'];
                else
                  trend = [trends[i].name, trends[i].tweet_volume, 'fill-color: #cae7ff'];
                rows.push(trend);
            }
          }
          var data = google.visualization.arrayToDataTable(rows);

          // Set chart options
          var options = { 'animation':{startup:true, duration:1000, easing:'out'},
                          'titlePosition': "none",
                          'bar': {groupWidth: "100%"},
                          'width':$window.innerWidth - 50,
                          'height':400,
                          'legend':{position:"none"}
                        };

          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
          chart.draw(data, options);
          
        } else {
          $scope.noResults = true;
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
