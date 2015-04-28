'use strict';

angular.module('dvizApp')
  .factory('Data', function ($resource) {
    return $resource('/api/data/:id/:controller', {
      id: '@_id'
    },
    {
      list: {
        method: 'GET',
        params: {
          controller: 'communities'
        },
        isArray: true
      },
      getReco: {
        method: 'POST',
        params: {
          controller: 'getReco'
        },
        isArray: true
      },
      comments: {
        method: 'GET',
        params: {
          controller: 'reviews'
        }
      },
      alsoWentHere: {
        method: 'GET',
        params: {
          controller: 'alsoWentHere'
        },
        isArray: true
      }
    });
  });
