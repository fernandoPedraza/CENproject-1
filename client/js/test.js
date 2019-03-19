var Twit = require('twit');
var https = require('https');

var T = new Twit({
  consumer_key: '9YhW80yHKvyIUvl176eYb3cTM',
  consumer_secret: 'cmdLjUGrKe7fpl4zF7OOofjEOFBhJW1zl32N7TARZLf4KHp5wc',
  access_token: '307112024-3jmp7WyltXsTHZuLiYvG3o0C3lUjcAeftstJvvEm',
  access_token_secret: 'CwtsauyphEbZ1TLEm5tVZcUEdXg1RiBi1VUdygEPEtsdo',
  timeout_ms: 60*1000,
  strictSSL: true,
})

// global trending topics
// get trending topics near a given location
// https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place
/*
T.get('trends/place', { id: 1 }, function(err, data, response) {
    // trends for a specific location
    trends = data[0].trends
    //console.log(trends)
    for(i = 0; i < trends.length; ++i) {
        //console.log(trends[i])
    }
})
*/

// https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-available
/*
T.get('trends/available', {}, function(err, data, response) {
    // Cities for which twitter has trending topics for
    available = data
    for(i = 0; i < available.length; ++i) {
        console.log(available[i])
    }
})
*/

// trending tweets globally 
// trending tweets based on a topic
// https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
/*
T.get('search/tweets', { q: '+', count: 100, result_type: 'popular' }, function(err, data, response) {
  console.log(data)
    console.log(err)
})
*/

// get User by username
// https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show
//T.get('users/show', { user_id: someuser, or screen_name: someuser }, function(err, data, response) {
//    console.log(data)
//})

