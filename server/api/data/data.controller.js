'use strict';

var _ = require('lodash');
var Community = require('./community.model');
var SortedRestaurants = require('./sorted.model');

// Get list of communities
exports.communities = function(req, res) {
  Community.find({}, '-_id', function (err, communities) {
    if(err) { return handleError(res, err); }
    var list = [];
    communities.forEach(function (com, index) {
      list.push(com.list);
      if(index == communities.length-1) {
        return res.json(200, _.flatten(list));
      }
    })
  });
};

// Get a single Community
exports.getReco = function(req, res) {
  var pref1 = req.body.pref1,
    pref2   = req.body.pref2,
    pref3   = req.body.pref3;
  Community.find({ list: { $in: [ pref1, pref2, pref3 ] } }, '-_id -list', function (err, comms) {
    var list = [];
    comms.forEach(function (c, index) {
      list.push(c.id);
      if(index == comms.length-1) {
        SortedRestaurants.getTopK(list[0], 10, function (err,rests) {
          res.send(200, {
            data: list
          });
        })
      }
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}