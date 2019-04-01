/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/user.server.model.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config'),
    NodeGeocoder = require('node-geocoder');

var google_api_key = 'AIzaSyA5WXvo4GKCAbAfdRJDA9N3x08GBeAjR4g'

var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: google_api_key, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);
 
var Twit = require('twit');

var T = new Twit({
  consumer_key: '9YhW80yHKvyIUvl176eYb3cTM',
  consumer_secret: 'cmdLjUGrKe7fpl4zF7OOofjEOFBhJW1zl32N7TARZLf4KHp5wc',
  access_token: '307112024-3jmp7WyltXsTHZuLiYvG3o0C3lUjcAeftstJvvEm',
  access_token_secret: 'CwtsauyphEbZ1TLEm5tVZcUEdXg1RiBi1VUdygEPEtsdo',
  timeout_ms: 60*1000,
  strictSSL: true,
})

exports.getGlobalTopics = function(req, res) {
  T.get('trends/place', { id: 1 }, function(err, data, response) {
    if (err) return res.json({ success: false, msg: 'Failed to get trends: ' +err });
    return res.json({ success: true, trending_topics: data[0].trends });
  })
}

exports.getTopTweets = function(req, res) {
  T.get('search/tweets', { q: '?', count: 6, result_type: 'popular', tweet_mode: 'extended' }, function(err, data, response) {
    if (err) return res.json({ success: false, msg: 'Failed to get tweets: ' +err });
    return res.json({ success: true, tweets: data.statuses });
  })
}

exports.getEmbeddedTweet = function(req, res) {
  var url = req.body.url;
  T.get('statuses/oembed', { url: url, hide_media: true, hide_thread: true, align: 'center' }, function(err, data, response) {
    if (err) return res.json({ success: false, msg: 'Unable to get embedded tweet: ' +err });
    return res.json({ success: true, embedded_tweet: data });
  });
}

exports.getTweetsByTopic = function(req, res) {
  var topic = req.body;
  T.get('search/tweets', { q: topic.query, count: 50, result_type: 'popular', tweet_mode: 'extended' }, function(err, data, response) {
    if (err) return res.json({ success: false, msg: 'Failed to get tweets: ' +err });
    return res.json({ success: true, tweets: data.statuses });
  })
}

exports.getTweetsByLocation = function(req, res) {
  var location = req.body.location;
  // Using callback
  geocoder.geocode(location, function(err, response) {
    if (err) return res.json({ success: false, msg: 'Invalid location: ' +err });
    var data = response[0];
    if (!data) return res.json({ success: false, msg: 'No data for this location: ' + location  }); 
    var locationFound = { neighborhood: data.extra.neighborhood, level1long: data.administrativeLevels.level1long, city: data.city };
    var lat = data.latitude.toString();
    var long = data.longitude.toString();
    var geo = lat + ',' + long + ',1mi';
    T.get('search/tweets', { q: '?', count: 9, result_type: 'popular', tweet_mode: 'extended',  geocode: geo }, function(err, data, response) {
      if (err) return res.json({ success: false, msg: 'Failed to get tweets: ' +err });
      return res.json({ success: true, tweets: data.statuses, locationFound: locationFound });
    });
  });
}

exports.getTrendsByLocation = function(req, res) {
  var location = req.body.location;
  // Using callback
  geocoder.geocode(location, function(err, response) {
    if (err) return res.json({ success: false, msg: 'Invalid location: ' +err });
    var data = response[0];
    if (!data) return res.json({ success: false, msg: 'No data for this location: ' + location  }); 
    var lat = data.latitude.toString();
    var long = data.longitude.toString();
    var geo = lat + ',' + long + ',1mi';
    T.get('trends/closest', { lat: lat, long: long }, function(err, data, response) {
      var woeid = data[0].woeid;
      T.get('trends/place', { id: woeid }, function(err, data, response) {
        if (err) return res.json({ success: false, msg: 'Failed to get trends: ' +err });
        return res.json({ success: true, trending_topics: data[0].trends });
      });
    });
  });
}

exports.authValidate = function(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], config.secret)
    req.userData = decoded;
    next();
  } catch (err) {
    return res.json({
      notAuthorized: true,
      success: false,
      msg: 'Authorization Failed'
    });
  }
}
