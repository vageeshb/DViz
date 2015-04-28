'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SortedAlsoWentHereSchema = new Schema({
  id: String,
  list: [String]
});

module.exports = mongoose.model('SortedAlsoWentHere', SortedAlsoWentHereSchema, 'sortedAlsoWentHere');