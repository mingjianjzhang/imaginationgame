'use strict';

/**
 * @ngdoc service
 * @name imaginationgameApp.session
 * @description
 * # session
 * Factory in the imaginationgameApp.
 */
angular.module('imaginationgameApp')
  .factory('SessionFactory', ['$http', function ($http) {
    // Service logic
    // ...
      var factory = {};
      factory.register = function(user, callback){
        $http.post('/users', user).then(function(res){
          callback(res.data);
        })
      }
      factory.login = function(creds, callback){
        $http.post('/login', creds).then(function(res){
          callback(res.data);
        })
      }
      factory.getCurrent = function(callback){
        $http.get('/currentUser').then(function(data){
          console.log("factory is working on getCurrent");
          callback(data.data);
        })
      }
      factory.logout = function(callback){
        $http.delete('/logout').then(function(res){
          callback();
        });
      }
      return factory;
  }]);
