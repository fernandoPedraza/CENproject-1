google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['tweetApp']);
});

angular.module('data').controller('DataController', ['$scope', '$window', 'Data',
  function($scope, $window, Data) {
    if (!$window.localStorage.getItem('token')) {
      $window.location.href = '/users';
    }

    if ($window.localStorage.getItem('location')) {
      $window.localStorage.removeItem('location');
    }
    if ($window.localStorage.getItem('topic')) {
      $window.localStorage.removeItem('topic');
    }

    if ($window.location.pathname == '/') {
      Data.getGlobalTopics().then(function(response) {
        $scope.top50topics = response.data.trending_topics;
        // Create the data table.
        var rows = [['Name', 'Volume', { role: 'style' }]];
        for (var i = 0; i < $scope.top50topics.length; i++) {
          if ($scope.top50topics[i].tweet_volume <= 0) continue;
          var topic = [$scope.top50topics[i].name, $scope.top50topics[i].tweet_volume, 'fill-color: #80ccff'];
          rows.push(topic);
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
      });

      $scope.topTweets = []
      Data.getTopTweets().then(function(response) {
        for (var i = 0; i < response.data.tweets.length; i++) {
          var screen_name = response.data.tweets[i].user.screen_name;
          var id = response.data.tweets[i].id_str;
          var url = { url: 'https://twitter.com/' + screen_name + '/status/' + id };
          Data.getEmbeddedTweet(url).then(function(response) {
            $scope.topTweets.push(response.data.embedded_tweet.html);
          });
        }
      });
    }

    $scope.logout = function() {
      $window.localStorage.clear();
      $window.location.href = '/users';
    };

    $scope.searchTopic = function(index) {
      var topic = $scope.top50topics[index];
      // store the index
      $window.localStorage.setItem('topic', JSON.stringify(topic));
      $window.location.href = '/searchbytopic';
    }

  }
]);