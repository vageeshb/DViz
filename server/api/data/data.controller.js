'use strict';

var _                 = require('lodash');
var Community         = require('./community.model');
var SortedRestaurants = require('./sorted.model');
var Restaurant        = require('./restaurant.model');
var Review        = require('./review.model');

// Get list of communities
exports.communities = function(req, res) {
  Community.find({}, '-_id', function (err, communities) {
    if(err) { return handleError(res, err); }
    res.json(communities);
  });
};

// Get Reviews for a restaurant
exports.reviews = function(req, res) {
  var business_id = req.params.id;
  Review.find({ business_id: business_id }, '-_id', {
    skip: 0, // Starting Row
    limit: 10, // Ending Row
    sort: {
      date: -1 //Sort by Stars
    }, 
  }, function (err, recentReviews) {
    if(err) { return handleError(res, err); }
    Review.find({ business_id: business_id }, '-_id', {
      skip: 0, // Starting Row
      limit: 10, // Ending Row
      sort: {
        stars: -1 //Sort by Stars
      }, 
    }, function (err, topReviews) {
      if(err) { return handleError(res, err); }
      res.json({
        top: topReviews,
        recent: recentReviews
      });
    });
  });
};

// Get a single Community
exports.getReco = function(req, res) {
  var w = req.body.weight,
  tw = w.european + w.american + w.medeterranian + w.asian + w.italian + w.services,
  weights = [],
  maxSet = 120;

  if(tw != 0) {
    weights.push({
      name: 'European',
      value: w.european / tw
    }, {
      name: 'Mediterranean',
      value: (w.medeterranian / tw)
    }, {
      name: 'Asian',
      value: (w.asian / tw)
    }, {
      name: 'American',
      value: (w.american / tw)
    }, {
      name: 'Italian',
      value: (w.italian / tw)  
    }, {
      name: 'Services',
      value: (w.services / tw)
    });
    weights.sort(function(a, b) {return b.value - a.value});
  }
  else
    weights.push({
      name: 'European',
      value: 1/6
    }, {
      name: 'Mediterranean',
      value: 1/6
    }, {
      name: 'Asian',
      value: 1/6
    }, {
      name: 'American',
      value: 1/6
    }, {
      name: 'Italian',
      value: 1/6
    }, {
      name: 'Services',
      value: 1/6
    });
  
  var resultList = [];
  weights.forEach(function (w, index) {
    var k = (w.value == 0) ? 0 : Math.ceil(maxSet * w.value);
    /*console.log(tw + ':' + w.value + ':' + k);*/
    SortedRestaurants.getTopK(w.name, k, function (err, list) {
      resultList.push(list);
      if(index == weights.length - 1) {
        var restList = [];
        resultList = _.flatten(resultList);
        resultList.forEach(function (id, index) {
          Restaurant.findOne({business_id: id}, function (err,r) {
            restList.push(r);
            if(index == resultList.length - 1) {
              res.json(restList);
            }
          });
        });
      }
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}