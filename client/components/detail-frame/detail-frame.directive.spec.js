'use strict';

describe('Directive: detailFrame', function () {

  // load the directive's module and view
  beforeEach(module('dvizApp'));
  beforeEach(module('components/detail-frame/detail-frame.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<detail-frame></detail-frame>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the detailFrame directive');
  }));
});