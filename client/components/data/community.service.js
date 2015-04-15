'use strict';

angular.module('dvizApp')
  .factory('Community', function ($resource) {
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
      }
    });
  });
