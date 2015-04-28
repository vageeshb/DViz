'use strict';
angular.module('dvizApp')
  .controller('FindCtrl', ['$scope', 'uiGmapGoogleMapApi', 'communities', 'Data', '$timeout', 
    function ($scope, uiGmapGoogleMapApi, communities, Data, $timeout) {
      $scope.limit = 10;
      $scope.collapse = false;
      
      $scope.$parent.crumbs = [{
        title: "Home",
        link: "main"
      }, {
        title: "Find",
        link: "find"
      }];

      $scope.weight = {
        european: 0,
        american: 0,
        medeterranian: 0,
        asian: 0,
        italian: 0,
        services: 0
      };

      $scope.lat = 33.4500;
      $scope.lng = -112.0667;
      $scope.zoom = 12;

      $scope.map = { 
        center: { 
          latitude: $scope.lat, 
          longitude: $scope.lng 
        }, 
        pan: true,
        zoom: $scope.zoom
      };

      $scope.model = {};
      $scope.selected = null;
      $scope.filteredMarkers = [];

      $scope.sliders = {
        checkin: {
          min: 0,
          max: 0
        },
        rating: {
          min: 0,
          max: 5
        }
      };

      var timer;

      $scope.$watch('checkinSliderValue', function (newVal, oldVal) {
        if(newVal) {
          var filteredResults = [];
          angular.forEach($scope.results, function(result, index) {
            if(result.checkin_count >= newVal 
                && result.stars >= $scope.ratingSliderValue
                && filteredResults.length < 10)
              filteredResults.push(result);
          });
          $scope.filteredResults = filteredResults;
          addMarkers($scope.filteredResults);
        }
      });

      $scope.$watch('ratingSliderValue', function (newVal,oldVal) {
        if(newVal) {
          var filteredResults = [];
          angular.forEach($scope.results, function(result, index) {
            if(result.stars >= newVal 
                && result.checkin_count >= $scope.checkinSliderValue 
                && filteredResults.length < 10)
              filteredResults.push(result);
          });
          $scope.filteredResults = filteredResults;
          addMarkers($scope.filteredResults);
        }
      });

      $scope.toggleCollapse = function () {
        $scope.collapse = !$scope.collapse;
        $scope.model = {};
      };

      $scope.isSelected = function(el) {
        return $scope.selected === el;
      };

      $scope.highlight = function(index, lat, lng) {
        timer = $timeout(function() {
          $scope.map.center.latitude = lat;
          $scope.map.center.longitude = lng;
          $scope.map.zoom = 13;

          $timeout(function() {
            var pin = angular.element('.pin-' + index);
            pin.css({
              'background'        : '#F16654',
              'border'            : '5px solid #5c4459',
              '-webkit-transform' : 'scale(1.5)',
              '-moz-transform'    : 'scale(1.5)',
              '-ms-transform'     : 'scale(1.5)',
              '-o-transform'      : 'scale(1.5)',
              'transform'         : 'scale(1.5)'
            });
          }, 500);
        }, 750);
      };

      $scope.reset = function(index) {
        $timeout.cancel(timer);
        
        $scope.map.zoom = $scope.zoom;
        
        var pin = angular.element('.pin-' + index);
        pin.css({
          'background'        : '#f59083',
          'border'            : '5px solid #795a75',
          '-webkit-transform' : 'scale(1)',
          '-moz-transform'    : 'scale(1)',
          '-ms-transform'     : 'scale(1)',
          '-o-transform'      : 'scale(1)',
          'transform'         : 'scale(1)'
        });
      };

      $scope.showFrame = function(model) {
        if($scope.selected == null || $scope.selected._id != model._id) {
          $scope.selected = model;
          $scope.$parent.crumbs.push({
            title: model.name,
            link: '#'
          });
          Data.comments({ id: model.business_id }, function (data) {
            $scope.model = model;
            $scope.reviews = data;
          }, function(err) {
            console.log('error');
          });
        } else {
          $scope.selected = null;
          $scope.$parent.crumbs = [{
              title: "Home",
              link: "main"
            }, {
              title: "Find",
              link: "find"
            }];
          $scope.model = {};
        }
      };

      $scope.getReco = function(){ 
        Data.getReco({
          weight: $scope.weight
        }, function (results) {
          $scope.results = results;
          $scope.filteredResults = results.slice(0, 10);

          $scope.markers = [];
          $scope.collapse = true;

          $scope.sliders.checkin.max = 0;
          
          angular.forEach(results, function (r, index) {
            if(r.checkin_count > $scope.sliders.checkin.max)
              $scope.sliders.checkin.max = r.checkin_count;
          });

          addMarkers($scope.filteredResults);
        });
      };

    function addMarkers (filtered) {
      $scope.filteredMarkers = [];
      angular.forEach(filtered, function (r, index) {
        var m = {
          id: r._id,
          coords: {
            latitude: r.latitude,
            longitude: r.longitude
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0
          },
          options: {
            labelClass: 'pin pin-' + index,
            labelContent: index + 1
          },
          misc: {
            title: r.name,
            name: 'aa'
          },
          show: false
        };
        m.onClick = function() {
          m.show = !m.show;
        };
        $scope.filteredMarkers.push(m);
      });
    }

  }]);
