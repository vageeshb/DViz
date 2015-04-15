'use strict';

var mongoose = require('mongoose'),
Schema       = mongoose.Schema;

var RestaurantSchema = new Schema({
  business_id: String,
  full_address: String,
  hours: Object,
  open: Boolean,
  categories: [String],
  city: String,
  review_count: Number,
  name: String,
  neighborhoods: [String],
  longitude: Number,
  state: String,
  stars: Number,
  latitude: Number,
  attributes: Object,
  type: String,
  checkin_count: Number
});

// Public profile information
RestaurantSchema
  .virtual('profile')
  .get(function() {
    return {
      id            : this.business_id,
      name          : this.name,
      full_address  : this.full_address,
      review_count  : this.review_count,
      longitude     : this.longitude,
      latitude      : this.latitude,
      stars         : this.stars
    };
  });


module.exports = mongoose.model('Restaurant', RestaurantSchema);