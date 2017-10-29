var mongoose = require('mongoose');

var uri = 'mongodb://user:pass@host:port/db';

mongoose.Promise = global.Promise;

mongoose.connect(uri);

module.exports = (function() {

  'use strict';

  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var CrimeSchema = new mongoose.Schema({
    _id: ObjectId,
    INCIDENT_NUMBER: String,
    OFFENSE_CODE: Number,
    OFFENSE_CODE_GROUP: String,
    OFFENSE_DESCRIPTION: String,
    DISTRICT: String,
    REPORTING_AREA: Number,
    SHOOTING: String,
    OCCURED_ON_DATE: Date,
    YEAR: Number,
    MONTH: Number,
    DAY_OF_WEEK: String,
    HOUR: Number,
    UCR_PART: String,
    STREET: String,
    Lat: Number,
    Long: Number,
    Location: String
  });

  var Crime = mongoose.model('Crime', CrimeSchema);

  return Crime;

})();
