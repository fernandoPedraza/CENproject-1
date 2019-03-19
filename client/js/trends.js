var Twit = require('twit');

var T = new Twit({
  consumer_key: '9YhW80yHKvyIUvl176eYb3cTM',
  consumer_secret: 'cmdLjUGrKe7fpl4zF7OOofjEOFBhJW1zl32N7TARZLf4KHp5wc',
  access_token: '307112024-3jmp7WyltXsTHZuLiYvG3o0C3lUjcAeftstJvvEm',
  access_token_secret: 'CwtsauyphEbZ1TLEm5tVZcUEdXg1RiBi1VUdygEPEtsdo',
  timeout_ms: 60*1000,
  strictSSL: true,
})

//T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
//  console.log(data)
//})

T.get('trends/place', { id: 1 }, function(err, data, response) {
    trends = data[0].trends
    //console.log(trends)
    for(i = 0; i < trends.length; ++i) {
        console.log(trends[i])
    }
})



