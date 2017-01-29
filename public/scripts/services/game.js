'use strict';

/**
 * @ngdoc service
 * @name imaginationgameApp.Game
 * @description
 * # Game
 * Factory in the imaginationgameApp.
 */
angular.module('imaginationgameApp')
  .factory('Game', ['$http', function ($http) {
   
   var factory = {};

   factory.createGame = function(game, callback){
      $http.post('/games', game).then(function(res){
        console.log("Successful Creation");
      })
   }

   factory.fetchUsers = function(callback){
    $http.get('/users').then(function(res){
      callback(res.data);
    })
   } 
 
  factory.myGames = function(id, callback){
    $http.get(`/games/${id}`).then(function(res){
      callback(res.data);
    })
  }
   return factory;
  }]);

