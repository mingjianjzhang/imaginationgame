'use strict';

describe('Service: Marvel', function () {

  // load the service's module
  beforeEach(module('imaginationgameApp'));

  // instantiate service
  var Marvel;
  beforeEach(inject(function (_Marvel_) {
    Marvel = _Marvel_;
  }));

  it('should do something', function () {
    expect(!!Marvel).toBe(true);
  });

});
