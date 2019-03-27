/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/user.server.model.js'),
    bcrypt = require('bcryptjs'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config');

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
  T.get('search/tweets', { q: '?', count: 6, result_type: 'popular' }, function(err, data, response) {
    if (err) return res.json({ success: false, msg: 'Failed to get tweets: ' +err });
    return res.json({ success: true, tweets: data.statuses });
  })
}

exports.getEmbeddedTweet = function(req, res) {
  var url = req.body.url;
  T.get('statuses/oembed', { url: url, hide_media: true, hide_thread: true, aligin: "center" }, function(err, data, response) {
    if (err) return res.json({ success: false, msg: 'Unable to get embedded tweet: ' +err });
    return res.json({ success: true, embedded_tweet: data });
  });
}

exports.getTweetsByTopic = function(req, res) {
  console.log('here');
  var topic = req.body;
  console.log(topic);
  T.get('search/tweets', { q: topic.query, count: 9, result_type: 'popular', tweet_mode: 'extended' }, function(err, data, response) {
    if (err) return res.json({ success: false, msg: 'Failed to get tweets: ' +err });
    return res.json({ success: true, tweets: data.statuses });
  })
}
