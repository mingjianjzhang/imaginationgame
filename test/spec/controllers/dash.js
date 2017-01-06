'use strict';

describe('Controller: DashctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('imaginationgameApp'));

  var DashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashCtrl = $controller('DashctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


});
