'use strict';

/**
 * @ngdoc service
 * @name imaginationgameApp.ComicVine
 * @description
 * # ComicVine
 * Factory in the imaginationgameApp.
 */
angular.module('imaginationgameApp')
  .factory('ComicVine', ['$http', function ($http) {
      var factory = {};

      factory.getCharacter = function(name, callback){
          $http.get(`/comicVineSearch/${name}`).then(function(data){
              callback(data.data);
          })
      }

      return factory;
  }]);
