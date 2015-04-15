/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Checkin = require('../api/data/checkin.model');
var Restaurant = require('../api/data/restaurant.model');

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

User.find({}).remove(function() {
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
      /*Checkin.find({}, function (err,docs) {
        if(err) console.log(err);
        docs.forEach(function (d, index) {
          Restaurant.findOneAndUpdate({business_id: d.business_id}, {checkin_count: Object.size(d.checkin_info)}, function (err,r) {
            if(r)
              console.log(index + ':' + r.business_id);
          });
        });
      });*/
    }
  );
});
