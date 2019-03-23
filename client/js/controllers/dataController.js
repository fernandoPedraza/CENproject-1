google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['tweetApp']);
});

angular.module('data').controller('DataController', ['$scope', '$window', 'Data',
  function($scope, $window, Data) {

    Data.getGlobalTopics().then(function(response) {
      $scope.top50topics = response.data.trending_topics;
      // Create the data table.
      var rows = [['Name', 'Volume', { role: 'style' }]];
      for (var i = 0; i < $scope.top50topics.length; i++) {
        if ($scope.top50topics[i].tweet_volume <= 0) continue;
        var topic = [$scope.top50topics[i].name, $scope.top50topics[i].tweet_volume, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'];
        rows.push(topic);
      }
      var data = google.visualization.arrayToDataTable(rows);

      // Set chart options
      var options = {'title':'Tweet volume for trending topics',
                     'width':$window.innerWidth - 50,
                     'height':400};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    });

    Data.getTopTweets().then(function(response) {
      $scope.topTweets = response.data.tweets;
      console.log($scope.topTweets);
    });

  }
]);
