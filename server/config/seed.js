*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/data/user.model');
var Review = require('../api/data/review.model');
var Restaurant = require('../api/data/restaurant.model');

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

/*Review.find({}, function(err, reviews) {
  if(err) console.log(err);
  reviews.forEach(function(review, index) {
    User.findOne({user_id: review.user_id}, function(err, user) {
      review.name = user.name;
      review.save();
      if(index % 1000 == 0)
        console.log("Updated " + index + " out of " + reviews.length);
    });
  });
});*/
/*User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
      Checkin.find({}, function (err,docs) {
        if(err) console.log(err);
        docs.forEach(function (d, index) {
          Restaurant.findOneAndUpdate({business_id: d.business_id}, {checkin_count: Object.size(d.checkin_info)}, function (err,r) {
            if(r)
              console.log(index + ':' + r.business_id);
          });
        });
      });
    }
  );
});
