'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommunitySchema = new Schema({
  id: String,
  list: [String]
});

module.exports = mongoose.model('Community', CommunitySchema);