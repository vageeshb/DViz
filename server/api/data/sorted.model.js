'use strict';

var mongoose = require('mongoose'),
_            = require('lodash'),
Schema       = mongoose.Schema;

var SortedRestaurantsSchema = new Schema({
  id: String,
  list: [String]
});


SortedRestaurantsSchema.statics.getTopK = function (id, k, cb) {
  return this.findOne({ id: id }, function (err, doc) {
    if (err) cb(err);
    cb(null, doc.list.slice(0, k));
  });
}

module.exports = mongoose.model('SortedRestaurants', SortedRestaurantsSchema);