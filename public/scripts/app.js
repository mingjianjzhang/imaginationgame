'use strict';

/**
 * @ngdoc overview
 * @name imaginationgameApp
 * @description
 * # imaginationgameApp
 *
 * Main module of the application.
 */
angular
  .module('imaginationgameApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'angular-md5',
    'ui.bootstrap',
    'cfp.hotkeys'
  ])
  .config(['$qProvider', '$routeProvider', function ($qProvider, $routeProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $routeProvider
      .when('/', {
        templateUrl: 'views/loginreg.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashCtrl',
        controllerAs: 'dash'
      })
      .when('/new_team/characters', {
        templateUrl: 'views/new_team.html',
        controller: 'TeamCtrl',
        controllerAs: 'team',
        resolve: {
          setUserTeam: function(){
            return {
              setUser: false
            }
          }
        }
      })
      .when('/new_team/moves', {
        templateUrl:'views/new_team_moves.html',
        controller: 'TeamCtrl',
        controllerAs: 'team',
        resolve: {
          setUserTeam: function(){
            return {
              setUser: true
            }
          }
        }
      })
      .when('/game_room/:id', {
        templateUrl: 'views/game_room.html',
        controller: 'GameRoomCtrl',
        controllerAs: 'room'
      })
      .when('/new_game', {
        templateUrl: 'views/new_game.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .filter('notSelf', function(){
    return function(currentUser, allUsers){
      return allUsers.filter(function(user){
        return !angular.equals(currentUser, user);
      })
    }
  })
  .filter('includes', function(){
    return function(baseArray, volatileArray) {
      var output = [];
      var dupes = [];
      if (!volatileArray) {
        return baseArray;
      }
      for (var i in volatileArray) {
        for (var j in baseArray){
          if (angular.equals(volatileArray[i], baseArray[j])) {
            dupes.push(j);
          }
        }
      }
      for (var k in baseArray) {
        if (dupes.indexOf(k) == -1) {
          output.push(baseArray[k]);
        }
      }
      return output;
    }
  });
