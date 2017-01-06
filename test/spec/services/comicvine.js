'use strict';

describe('Service: ComicVine', function () {

  // load the service's module
  beforeEach(module('imaginationgameApp'));

  // instantiate service
  var ComicVine;
  beforeEach(inject(function (_ComicVine_) {
    ComicVine = _ComicVine_;
  }));

  it('should do something', function () {
    expect(!!ComicVine).toBe(true);
  });

});
