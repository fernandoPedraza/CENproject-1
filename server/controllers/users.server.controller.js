
/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/user.server.model.js'),
    bcrypt = require('bcryptjs'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config');

/* Create a user */
exports.createUser = function(req, res) {
  var user = new User(req.body);

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      user.save(function(err) {
        if(err) {
          res.json({ success: false, msg: 'Failed to register user' });
        } else {
          res.json({ success: true, msg: 'User registered' });
        }
      });
    });
  });
};

exports.login = function(req, res) {
  var userRequested = new User(req.body);

  User.find({ username: userRequested.username }, function(err, userFound) {
    if (err) {
      return res.json({ success: false, msg: 'MongoDB find user error' });
    }
    if (!userFound) {
      return res.json({ success: false, msg: 'User not found' });
    }
    userFound = userFound[0];
    bcrypt.compare(userRequested.password, userFound.password, function(err, isMatch) {
      if (err) console.log(err);
      if (isMatch) {
        const token = jwt.sign({data: userFound}, config.secret, {
          expiresIn: 604000
        });
        res.json({
          success: true,
          token: 'JWT ' +token,
          user: {
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Invalid password' });
      }
    });
  });
}
