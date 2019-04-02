/* Dependencies */
const mongoose = require('mongoose'),
    User = require('../models/user.server.model.js'),
    bcrypt = require('bcryptjs'),
    config = require('../config/config');

exports.login = function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) return res.json({
      success: false,
      msg: 'Authorization Failed'
    });
    if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) return res.json({
          success: false,
          msg: 'Authorization Failed'
        });
        if (result) {
          const token = user.generateJwt();
          return res.json({
            success: true,
            msg: 'Authorization Success',
            token: token,
            username: user.username
          });
        } else {
          return res.json({
            success: false,
            msg: 'Authorization Failed'
          });
        }
      });
    } else {
      return res.json({
        success: false,
        msg: 'Authorization Failed'
      });
    }
  });
};

exports.register = function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return res.json({
        success: false,
        msg: 'Registration Failed'
      });
    } else {
      var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save(function(err) {
        if (err) return res.json({
          success: false,
          msg: 'Registration Failed'
        });
        else {
          User.findOne({ username: user.username }, function(err, user) {
            if (err) return res.json({
              success: false,
              msg: 'Registration Failed'
            });
            else {
              // everything was successful, generate and send back token
              const token = user.generateJwt();
              return res.json({
                success: true,
                msg: "Authentication Success",
                token: token,
                username: user.username
              });
            }
          });
        }
      });
    }
  });
};