'use strict';

angular.module('dvizApp')
  .directive('detailFrame', function () {
    return {
      templateUrl: 'components/detail-frame/detail-frame.html',
      restrict: 'E',
      scope: {
        model: '=',
        reviews: '='
      },
      link: function (scope, element, attrs) {
        scope.show = false;
        scope.$watch('model', function (newVal, oldVal) {
          if(newVal)
            scope.model = newVal;
        });

        scope.close = function () {
          scope.model = null;
        };

        scope.isEmpty = function(obj) {
          if(obj == null) {
            return true;
          }
          return Object.keys(obj).length === 0;
        };
      }
    };
  });