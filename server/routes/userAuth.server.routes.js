/* Dependencies */
var user = require('../controllers/userAuth.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/login')
  .post(user.login);

router.route('/register')
  .post(user.register);

module.exports = router;