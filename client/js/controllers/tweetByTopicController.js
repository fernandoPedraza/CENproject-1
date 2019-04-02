angular.module('tweet_by_topic').controller('TweetByTopicController', ['$scope', '$window', 'Data',
  function($scope, $window, Data) {
    $scope.currentTopic = undefined;
    
    if (!$window.localStorage.getItem('token')) {
      $window.location.href = '/users';
    }

    if ($window.localStorage.getItem('location')) {
      $window.localStorage.removeItem('location');
    }

    $scope.tweetsByTopic = undefined;
    if ($window.localStorage.getItem('topic')) {
      // must be coming from the home page
      var topic = JSON.parse($window.localStorage.getItem('topic'));
      $scope.currentTopic = topic.name;
      Data.getTweetsByTopic(topic).then(function(response) {
        if (response.data.notAuthorized) {
          $window.location.href = '/users';
        }
        if (response.data.success && response.data.tweets.length > 0) {
          $scope.tweetsByTopic = [];
          var tweets = response.data.tweets;
          var max;
          if (tweets.length < 9) {
            max = tweets.length;
          } else {
            max = 9;
          }
          for (i = 0; i < max; ++i) {
            tweets[i].extraTweets = []
            tweets[i].link = 'https://twitter.com/' + tweets[i].user.screen_name + '/status/' + tweets[i].id_str
            tweets[i].created_at = tweets[i].created_at.replace('+0000', '');
            tweets[i].user.profile_link = 'https://twitter.com/' + tweets[i].user.screen_name
            if (nameExists(tweets[i].user.screen_name)) {
              updatetweetsByTopic(tweets[i].user.screen_name, tweets[i]);
              max += 1;
              if (max > tweets.length) {
                break;
              }
              continue
            }
            $scope.tweetsByTopic.push(tweets[i]);
          }
          // final cleaning
          for (i = 0; i < $scope.tweetsByTopic.length; ++i) {
            var tweet = $scope.tweetsByTopic[i]
            var httpsIndex = tweet.full_text.indexOf('https://');
            if (httpsIndex != -1) {
              // $scope.tweetsByTopic[i].link = tweet.full_text.substring(httpsIndex,);
              $scope.tweetsByTopic[i].full_text = tweet.full_text.substring(0, httpsIndex);
            }
            for (j = 0; j < tweet.extraTweets.length; ++j) {
              var extraTweet = tweet.extraTweets[j]
              var httpsIndex = extraTweet.full_text.indexOf('https://');
              if (httpsIndex != -1) {
                // $scope.tweetsByTopic[i].extraTweets[j].link = extraTweet.full_text.substring(httpsIndex,);
                $scope.tweetsByTopic[i].extraTweets[j].full_text = extraTweet.full_text.substring(0, httpsIndex);
              }
            }
          }
        } else {
          $scope.noResults = true;
        }
      })
    }
    var nameExists = function(screen_name) {
      for (j = 0; j < $scope.tweetsByTopic.length; ++j) {
        var tweet = $scope.tweetsByTopic[j];
        if (tweet.user.screen_name == screen_name) {
          return true;
        }
      }
      return false;
    }

    var updatetweetsByTopic = function(nameTarget, tweet) {
      for (j = 0; j < $scope.tweetsByTopic.length; ++j) {
        var name = $scope.tweetsByTopic[j].user.screen_name;
        if (name == nameTarget) {
          if ($scope.tweetsByTopic[j].extraTweets.length < 2) {
            $scope.tweetsByTopic[j].extraTweets.push(tweet);
          }
          return;
        }
      }
    }


    $scope.searchForTopic = function() {
      var topic = { name: $scope.topicQuery, query: $scope.topicQuery }
      $window.localStorage.setItem('topic', JSON.stringify(topic));
    }

    $scope.removeTopic = function() {
      if ($window.localStorage.getItem('topic')) {
        $window.localStorage.removeItem('topic');
      }
    }

    $scope.logout = function() {
      $window.localStorage.clear();
      $window.location.href = '/users'
    };
  }
]);
