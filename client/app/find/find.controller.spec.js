'use strict';

describe('Controller: FindCtrl', function () {

  // load the controller's module
  beforeEach(module('dvizApp'));

  var FindCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindCtrl = $controller('FindCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
