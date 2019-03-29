const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) {
      return done(null, false, {
        msg: 'User not found'
      });
    }
    if (!user.validPassword(password)) {
      return done(null, false, {
        msg: 'Wrong password'
      })
    }
    return done(null, user);
  });
}));