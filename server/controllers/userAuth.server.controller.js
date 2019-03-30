/* Dependencies */
const mongoose = require('mongoose'),
    User = require('../models/user.server.model.js'),
    bcrypt = require('bcryptjs'),
    crypto = require('crypto'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config');

exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    var token;

    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      token = user.generateJwt();
      return res.status(200).json({ success: true, token: token });
    } else {
      return res.status(401).json(info);
    }

  })(req, res);
};

exports.register = function(req, res) {
  var user = new User(req.body);

  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');
  user.salt = salt;
  user.password = hash;

  user.save(function(err) {
    if(err) return res.json({ success: false, msg: err.errmsg });
    var token;
    token = user.generateJwt();
    res.status(200);
    return res.json({ success: true, msg: 'User registered', token: token });
  });
};
