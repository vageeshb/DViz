'use strict';

angular.module('dvizApp')
  .controller('FindCtrl', ['$scope', 'uiGmapGoogleMapApi', 'communities', 'Community', 
    function ($scope, uiGmapGoogleMapApi, communities, Community) {
      $scope.lat = 33.4500;
      $scope.lng = -112.0667;
      $scope.zoom = 8;
      $scope.communities = communities;
      $scope.map = { 
        center: { 
          latitude: $scope.lat, 
          longitude: $scope.lng 
        }, 
        zoom: $scope.zoom
      };
      
      $scope.getReco = function(){ 
        Community.getReco({
          pref1: $scope.pref1,
          pref2: $scope.pref2,
          pref3: $scope.pref3,
        }, function (resp) {
          console.log(resp.data);
        });
        /*$scope.map.center = {
          latitude: +$scope.lat,
          longitude: +$scope.lng
        };
        $scope.map.zoom = +$scope.zoom;*/
      };

  }]);
