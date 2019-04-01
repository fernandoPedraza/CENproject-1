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

    Data.getGlobalTopics().then(function(response) {
      if (response.data.notAuthorized) {
        // not authorized
        $window.location.href = '/users';
      }
      $scope.top50topics = response.data.trending_topics;
      // Create the data table.
      var rows = [['Name', 'Volume', { role: 'style' }]];
      var max = 20;
      for (var i = 0; i < max; i++) {
        if ($scope.top50topics[i].tweet_volume <= 0) {
          max += 1;
          continue
        }
        var topic = [$scope.top50topics[i].name, $scope.top50topics[i].tweet_volume, 'fill-color: #80ccff'];
        rows.push(topic);
      }
      var data = google.visualization.arrayToDataTable(rows);

      // Set chart options
      var options = { titlePosition: 'none',
                      width:$window.innerWidth - 50,
                      height:400,
                      legend:{'position':'none'}
                    };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    });

    $scope.topTweets = []
    Data.getTopTweets().then(function(response) {
      if (response.data.notAuthorized) {
          $window.location.href = '/users';
        }
        if (response.data.success && response.data.tweets.length > 0) {
          $scope.topTweets = [];
          var tweets = response.data.tweets;
          console.log(tweets);
          var max;
          if (tweets.length < 9) {
            max = tweets.length;
          } else {
            max = 9;
          }
          for (i = 0; i < max; ++i) {
            tweets[i].extraTweets = []
            tweets[i].link = 'https://twitter.com/' + tweets[i].user.screen_name + '/status/' + tweets[i].id_str
            tweets[i].created_at = tweets[i].created_at.replace('+0000', '')
            tweets[i].user.profile_link = 'https://twitter.com/' + tweets[i].user.screen_name
            if (nameExists(tweets[i].user.screen_name)) {
              updatetopTweets(tweets[i].user.screen_name, tweets[i]);
              max += 1;
              if (max > tweets.length) {
                break;
              }
              continue
            }
            $scope.topTweets.push(tweets[i]);
          }
          // final cleaning
          for (i = 0; i < $scope.topTweets.length; ++i) {
            var tweet = $scope.topTweets[i]
            var httpsIndex = tweet.full_text.indexOf('https://');
            if (httpsIndex != -1) {
              // $scope.topTweets[i].link = tweet.full_text.substring(httpsIndex,);
              $scope.topTweets[i].full_text = tweet.full_text.substring(0, httpsIndex);
            }
            for (j = 0; j < tweet.extraTweets.length; ++j) {
              var extraTweet = tweet.extraTweets[j]
              var httpsIndex = extraTweet.full_text.indexOf('https://');
              if (httpsIndex != -1) {
                // $scope.topTweets[i].extraTweets[j].link = extraTweet.full_text.substring(httpsIndex,);
                $scope.topTweets[i].extraTweets[j].full_text = extraTweet.full_text.substring(0, httpsIndex);
              }
            }
          }
        }
    });

    var nameExists = function(screen_name) {
      for (j = 0; j < $scope.topTweets.length; ++j) {
        var tweet = $scope.topTweets[j];
        if (tweet.user.screen_name == screen_name) {
          return true;
        }
      }
      return false;
    }

    var updatetopTweets = function(nameTarget, tweet) {
      for (j = 0; j < $scope.topTweets.length; ++j) {
        var name = $scope.topTweets[j].user.screen_name;
        if (name == nameTarget) {
          if ($scope.topTweets[j].extraTweets.length < 2) {
            $scope.topTweets[j].extraTweets.push(tweet);
          }
          return;
        }
      }
    }

    $scope.logout = function() {
      $window.localStorage.clear();
      $window.location.href = '/users';
    };

    $scope.searchTopic = function(index) {
      var topic = $scope.top50topics[index];
      $window.localStorage.setItem('topic', JSON.stringify(topic));
      $window.location.href = '/searchbytopic';
    }

  }
]);