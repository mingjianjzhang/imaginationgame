'use strict';

angular.module('imaginationgameApp')
  .factory('Team', ['$http', function ($http) {

    var factory = {};

    factory.createCharacter = function(character, callback) {
      $http.post('/characters', character).then(function(res){
        callback(res.data);
      })
    }

    factory.create = function(team, callback){
      $http.post('/teams', team).then(function(res){
        callback(res.data);
      })
    }
    factory.byUser = function(id, callback){
      console.log(id);
      $http.get(`/teams/user/${id}`).then(function(res){
        callback(res.data);
      })
    }

    return factory;


  }]);
