'use strict';

describe('Controller: GameroomCtrl', function () {

  // load the controller's module
  beforeEach(module('imaginationgameApp'));

  var GameroomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameroomCtrl = $controller('GameroomCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GameroomCtrl.awesomeThings.length).toBe(3);
  });
});
