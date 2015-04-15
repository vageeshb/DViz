'use strict';

angular.module('dvizApp')
  .controller('FindCtrl', ['$scope', 'uiGmapGoogleMapApi', 'communities', 'Community', 
    function ($scope, uiGmapGoogleMapApi, communities, Community) {
      $scope.limit = 10;
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
      $scope.communities = communities;
      $scope.markers = [];
      $scope.map = { 
        center: { 
          latitude: $scope.lat, 
          longitude: $scope.lng 
        }, 
        zoom: $scope.zoom
      };
      var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: 'gold',
        strokeWeight: 14
      };
      
      $scope.getReco = function(){ 
        Community.getReco({
          weight: $scope.weight
        }, function (resp) {
          var results = resp;
          $scope.results = results
          $scope.markers = [];
          results.forEach(function (r, index) {
            if(index > $scope.limit)
              return;
            var m = {
              id: r._id,
              coords: {
                latitude: r.latitude,
                longitude: r.longitude
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
            $scope.markers.push(m);
            if(index == results.length - 1) {
              angular.forEach($scope.markers,function(marker){
                marker.events = {};
              });
            }
          });
        });
      };

  }]);
