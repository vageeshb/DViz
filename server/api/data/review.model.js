'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  user_id: String,
  review_id: String,
  business_id: String,
  stars: Number,
  text: String,
  type: String,
  votes: Object,
  date: String
});

module.exports = mongoose.model('Review', ReviewSchema);