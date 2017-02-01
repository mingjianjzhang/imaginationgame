'use strict';

describe('Controller: DashmodalinstanceCtrl', function () {

  // load the controller's module
  beforeEach(module('imaginationgameApp'));

  var DashmodalinstanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashmodalinstanceCtrl = $controller('DashmodalinstanceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashmodalinstanceCtrl.awesomeThings.length).toBe(3);
  });
});
