/* Dependencies */
const mongoose = require('mongoose'),
    User = require('../models/user.server.model.js'),
    bcrypt = require('bcryptjs'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config');

exports.login = function(req, res) {

};

exports.register = function(req, res) {
  var user = new User(req.body);

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      user.save(function(err) {
        if(err) return res.json({ success: false, msg: err.errmsg });
        return res.json({ success: true, msg: 'User registered' });
      });
    });
});

};
