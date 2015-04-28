'use strict';

angular.module('dvizApp')
  .directive('detailFrame', ['Data', function (Data) {
    return {
      templateUrl: 'components/detail-frame/detail-frame.html',
      restrict: 'E',
      scope: {
        model: '=',
        reviews: '='
      },
      link: function (scope, element, attrs) {
        scope.show = false;
        scope.heading = 0;
        scope.fov = 120;
        scope.alsoWentHere = null;
        var apiKey = 'AIzaSyBGwQtENkCdCT_a4MXy5XmTJ4rnlOvo1BQ';

        scope.$watch('model', function (newVal, oldVal) {
          if(newVal) {
            scope.model = newVal;
            scope.heading = 0;
            scope.fov = 120;
            scope.streetSrc = 
            'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' +
              Math.round(scope.model.latitude * 10000) / 10000 + ',' + Math.round(scope.model.longitude * 10000) / 10000 + '&fov=' + scope.fov + '&heading=' + scope.heading + '&key=' + apiKey;
            
            if(newVal.business_id)
              Data.alsoWentHere({
                id: newVal.business_id
              }, function(data) {
                scope.alsoWentHere = data;
              })
          }
        });

        scope.makeImage = function(model) {
          return 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' +
              Math.round(model.latitude * 10000) / 10000 + ',' + Math.round(model.longitude * 10000) / 10000 + '&fov=' + scope.fov + '&heading=' + scope.heading + '&key=' + apiKey;
        };

        scope.updateFrame = function(model) {
          scope.model = null;
          Data.comments({ id: model.business_id }, function (data) {
            scope.model = model;
            scope.reviews = data;
          }, function(err) {
            console.log('error');
          });
        };

        scope.typeOf = function(obj) {
          return typeof(obj);
        };

        scope.filterByTrue = function(items) {
            var result = {};
            angular.forEach(items, function(v, k) {
                if (v == true) {
                    result[k] = v;
                }
            });
            return result;
        };

        scope.toTitleCase = function(str)
        { 
          if(typeof str == 'number')
            return str;
          str = str.replace(/_/g, ' ');
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };

        scope.right = function() {
          scope.heading += 30;
        };

        scope.left = function() {
          scope.heading -= 30;
        };

        scope.close = function () {
          scope.$parent.crumbs = [{
            title: "Home",
            link: "main"
          }, {
            title: "Find",
            link: "find"
          }];
          scope.model = null;
          scope.$parent.selected = null;
        };

        scope.zoomIn = function () {
          if(scope.fov >= 10)
            scope.fov -= 10;  
        };

        scope.zoomOut = function () {
          if(scope.fov <= 110)
            scope.fov += 10;  
        };

        scope.$watch('heading', function (newVal, oldVal) {

          scope.streetSrc = 
            'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' +
              Math.round(scope.model.latitude * 10000) / 10000 + ',' + Math.round(scope.model.longitude * 10000) / 10000 + '&fov=' + scope.fov + '&heading=' + scope.heading + '&key=' + apiKey;
        });

        scope.$watch('fov', function (newVal, oldVal) {
          scope.streetSrc = 
            'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' +
              Math.round(scope.model.latitude * 10000) / 10000 + ',' + Math.round(scope.model.longitude * 10000) / 10000 + '&fov=' + scope.fov + '&heading=' + scope.heading + '&key=' + apiKey;
        });

        scope.isEmpty = function(obj) {
          if(obj == null) {
            return true;
          }
          return Object.keys(obj).length === 0;
        };
      }
    };
  }]);