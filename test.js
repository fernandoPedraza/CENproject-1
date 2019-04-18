var should = require('should')



var Twit = require('twit');
var T = new Twit({
    consumer_key: '9YhW80yHKvyIUvl176eYb3cTM',
    consumer_secret: 'cmdLjUGrKe7fpl4zF7OOofjEOFBhJW1zl32N7TARZLf4KHp5wc',
    access_token: '307112024-3jmp7WyltXsTHZuLiYvG3o0C3lUjcAeftstJvvEm',
    access_token_secret: 'CwtsauyphEbZ1TLEm5tVZcUEdXg1RiBi1VUdygEPEtsdo',
    timeout_ms: 60*1000,
    strictSSL: true,
  })


describe('Twitter API Unit Tests', function() {

  describe('getting trends', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('global topics', function(done){
      T.get('trends/place', { id: 1 }, function(err, data, response){
        should.not.exist(err);
        done();
      });
    });
    it('top tweets', function(done){
      T.get('search/tweets', { q: '?', count: 6, result_type: 'popular', tweet_mode: 'extended' }, function(err, data, response){
        should.not.exist(err);
        done();
      });
    });

    

  });
});
