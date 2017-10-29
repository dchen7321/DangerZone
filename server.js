(function() {

  'use strict';

  var express = require('express');
  var path = require('path');
  var fs = require('fs');
  var morgan = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var multer = require('multer');
  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);
  var mongoose = require('mongoose');
  var passport = require('passport');
  var config = require('config');

  var crimesRouter = require('./app/routes/crimes');

  var app = express();

  app.use('/app', express.static(__dirname + '/app'));
  app.use('/node_modules', express.static(__dirname + '/node_modules'));

  app.use('/crimes', crimesRouter);

  mongoose.connect(config.get('mongo.connectionString'));

  app.get('/', function(req, res) {
    res.sendfile('./app/public/index.html');
  });

  app.listen(config.get('node.port'), config.get('node.ip'));

})();
