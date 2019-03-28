angular.module('tweet_by_topic').controller('TweetByTopicController', ['$scope', '$window', 'Data',
  function($scope, $window, Data) {
    $scope.currentTopic = undefined;
    
    if (!$window.localStorage.getItem('token')) {
      $window.location.href = '/users';
    }

    $scope.tweetsByTopic = undefined;
    if ($window.localStorage.getItem('topic')) {
      // must be coming from the home page
      var topic = JSON.parse($window.localStorage.getItem('topic'));
      $scope.currentTopic = topic.name;
      Data.getTweetsByTopic(topic).then(function(response) {
        if (response.data.success && response.data.tweets.length > 0) {
          $scope.tweetsByTopic = [];
          var tweets = response.data.tweets;
          for (i = 0; i < tweets.length; ++i) {
            // removing sublinks ... might not be necessary 
            console.log(tweets[i]);
            var httpsIndex = tweets[i].full_text.indexOf('https://');
            if (httpsIndex != -1) {
              tweets[i].link = tweets[i].full_text.substring(httpsIndex,);
              tweets[i].full_text = tweets[i].full_text.substring(0, httpsIndex);
            }
            $scope.tweetsByTopic.push(tweets[i]);
          }
        }
      })
    }

    $scope.searchForTopic = function() {
      var topic = { name: $scope.topicQuery, query: $scope.topicQuery }
      $window.localStorage.setItem('topic', JSON.stringify(topic));
    }

    $scope.logout = function() {
      $window.localStorage.clear();
    };
  }
]);
