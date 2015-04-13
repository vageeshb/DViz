'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SortedRestaurantsSchema = new Schema({
  id: Number,
  list: [String]
});


SortedRestaurantsSchema.statics.getTopK = function (comm_id, k, cb) {
  return this.findOne({ id: comm_id }, function (err, doc) {
    if (err) cb(err);
    cb(null, doc.list.slice(0, k));
  });
}

module.exports = mongoose.model('SortedRestaurants', SortedRestaurantsSchema);