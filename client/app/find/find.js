'use strict';

angular.module('dvizApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('find', {
        url: '/find',
        templateUrl: 'app/find/find.html',
        controller: 'FindCtrl',
        resolve: {
          communities: ['Community', function (Community) {
            return Community.list();
          }]
        }
      });
  });