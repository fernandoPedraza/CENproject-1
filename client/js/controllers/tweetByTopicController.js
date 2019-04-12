angular.module('tweet_by_topic').controller('TweetByTopicController', ['$scope', '$window', 'Data',
  function($scope, $window, Data) {
    $scope.currentTopic = undefined;
    
    if (!$window.localStorage.getItem('token')) {
      $window.location.href = '/users';
    }

    if ($window.localStorage.getItem('location')) {
      $window.localStorage.removeItem('location');
    }

    if ($window.localStorage.getItem('result_type_location')) {
      $window.localStorage.removeItem('result_type_location')
    }

    if ($window.localStorage.getItem('result_type_topic')) {
      var result_type = $window.localStorage.getItem('result_type_topic');
      $scope.result_type = result_type.charAt(0).toUpperCase() +  result_type.slice(1);
    } else {
      $scope.result_type = 'Popular';
    }
    var getTweetsByTopic = function() {
      var topic = JSON.parse($window.localStorage.getItem('topic'));
      var res_type = $scope.result_type.charAt(0).toLowerCase() + $scope.result_type.slice(1);
      topic.result_type = res_type;
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

    $scope.tweetsByTopic = undefined;
    if ($window.localStorage.getItem('topic')) {
      getTweetsByTopic();
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

    $scope.setResultType = function(result_type) {
      // could implement it such that clicking the same result type doesn't change the results... not sure if necessary
      var prev_res_type = '';
      // if ($window.localStorage.getItem('result_type_topic')) {
      //   prev_res_type = $window.localStorage.getItem('result_type_topic'); 
      // }
      $scope.result_type = result_type.charAt(0).toUpperCase() +  result_type.slice(1);
      $window.localStorage.setItem('result_type_topic', result_type) 
      if ($window.localStorage.getItem('topic') && prev_res_type != result_type) {
        getTweetsByTopic();
      }
    }

    $scope.searchForTopic = function() {
      var topic = { name: $scope.topicQuery, query: $scope.topicQuery }
      $window.localStorage.setItem('topic', JSON.stringify(topic));
    }

    // $scope.removeTopic = function() {
    //   if ($window.localStorage.getItem('topic')) {
    //     $window.localStorage.removeItem('topic');
    //   }
    //   if ($window.localStorage.getItem('result_type')) {
    //     $window.localStorage.removeItem('result_type');
    //   }
    // }

    $scope.logout = function() {
      $window.localStorage.clear();
      $window.location.href = '/users'
    };
  }
]);
