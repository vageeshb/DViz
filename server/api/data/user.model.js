'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  yelping_since: String,
  votes: Object,
  review_count: Number,
  user_id: String,
  friends: [String],
  fans: Number,
  average_stars: Number,
  type: String,
  compliments: Object,
  elite: [Number]
});

module.exports = mongoose.model('User', UserSchema);