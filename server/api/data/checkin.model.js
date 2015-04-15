'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CheckinSchema = new Schema({
  business_id: String,
  type: String,
  checkin_info: Object
});

module.exports = mongoose.model('Checkins', CheckinSchema);