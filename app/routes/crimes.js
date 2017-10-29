var express = require('express');
var Crime = require('../schemas/crime');

module.exports = (function() {

  'use strict';

  
  var router = express.Router();

  router.route('/')
    .get(function(req, res) {
      var crimes = Crime.find({
        'Lat': {
          $lt: parseFloat(req.query.lat) + 0.007,
          $gt: parseFloat(req.query.lat) - 0.007
        }, 'Long': {
          $lt: parseFloat(req.query.long) + 0.007,
          $gt: parseFloat(req.query.long) - 0.007
        }
      });
      crimes.sort('-OCCURED_ON_DATE').exec(function(err, results) {
        if (err) {
          res.status(500).json({'message':'cannot get results'});
        } else {
          res.json(results);
        }
      });
    });

  return router;

})();