/* Dependencies */
var users = require('../controllers/users.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/register')
  .post(users.createUser);

router.route('/login')
  .post(users.login);

module.exports = router;
