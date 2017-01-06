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
    'angular-md5'
  ])
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('includes', function(){
    return function(baseArray, volatileArray) {
      console.log("a call is being made to the filter", volatileArray);
      var output = [];
      if (!volatileArray.length) {
        return baseArray;
      }
      for (var i in baseArray) {
          for (var j in volatileArray) {
            if (!angular.equals(baseArray[i], volatileArray[j])) {
              output.push(baseArray[i]);
            }
          }
      }
      return output;
    }
  });
