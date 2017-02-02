'use strict';

describe('Directive: igBattleTeam', function () {

  // load the directive's module
  beforeEach(module('imaginationgameApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ig-battle-team></ig-battle-team>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the igBattleTeam directive');
  }));
});
