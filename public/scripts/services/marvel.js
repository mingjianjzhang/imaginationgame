'use strict';

/**
 * @ngdoc service
 * @name imaginationgameApp.Marvel
 * @description
 * # Marvel
 * Factory in the imaginationgameApp.
 */
angular.module('imaginationgameApp')
  .factory('Marvel', ['$http', 'md5', function ($http, md5) {
    // Service logic
    // ...
    var factory = {};
    var publicKey = 'da098d6c37d42f0c7e7a21eb30a5f9df';
    var privateKey = 'a373c4dbd857ed78b46a154b5b2bda545ecd79e2'
    var ts = Date.now();

    factory.getCharacter = function(name, callback){
      var hash = md5.createHash(ts+privateKey+publicKey);
      console.log("made it to the factory");
      console.log(`https://gateway.marvel.com/v1/public/characters?name=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`, "the url");
        $http.get(`https://gateway.marvel.com/v1/public/characters?name=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`).then(function(res){
          if (res.data.data.results[0]) {
            callback(res.data.data.results[0]);
          } 
          // else {
          //   callback(res.data.data);
          // }
        }, function(res){
          console.log("BIG ERRORS");
        })

    }

    return factory;
  }]);
