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
        callback(res);
      })
   }

   factory.fetchUsers = function(callback){
      console.log("are we making it here?");
    $http.get('/users').then(function(res){
      callback(res.data);
    })
   } 
 
  factory.myGames = function(id, callback){
    $http.get(`/games/user/${id}`).then(function(res){
      callback(res.data);
    })
  }
  factory.fetchGame = function(id, callback){
    $http.get(`/games/${id}`).then(function(res){
      console.log(res.data);
      callback(res.data);
    })
  }

  factory.setTeam = function(gameID, teamID, callback){
    console.log("made it to the factory");
    $http.put(`/game/${gameID}/edit_team`, { teamID: teamID }).then(function(res){
      callback(res);
    })
  }

   return factory;
  
  }]);

