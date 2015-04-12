'use strict';

angular.module('dvizApp')
  .controller('FindCtrl', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {
    $scope.lat = 33.4500;
    $scope.lng = -112.0667;
    $scope.zoom = 8;
    $scope.map = { 
      center: { 
        latitude: $scope.lat, 
        longitude: $scope.lng 
      }, 
      zoom: $scope.zoom
    };
    
    $scope.updateMap = function(){ 
      $scope.map.center = {
        latitude: +$scope.lat,
        longitude: +$scope.lng
      };
      $scope.map.zoom = +$scope.zoom;
    };

  }]);
