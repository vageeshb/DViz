'use strict';

angular.module('dvizApp')
  .directive('starRating', function () {
    return {
      restrict: 'E',
      scope: {
        stars: '='
      },
      link: function (scope, element, attrs) {
        
        var numFull = Math.floor(scope.stars),
        numEmpty = 5 - Math.ceil(scope.stars);

        for (var i = 0; i < numFull; i++) {
          var eFullStar = angular.element('<i/>', {
            class: 'fa fa-star'
          });
          element.append(eFullStar);
        };

        var eHalfStar = angular.element('<i/>', {
          class: 'fa fa-star-half-o'
        });
        if((scope.stars / 0.5) % 2 == 1)
          element.append(eHalfStar);
        
        for (var i = 0; i < numEmpty; i++) {
          var eEmptyStar = angular.element('<i/>', {
            class: 'fa fa-star-o'
          });
          element.append(eEmptyStar);
        };
      }
    };
  });