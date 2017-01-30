'use strict';

/**
 * @ngdoc directive
 * @name imaginationgameApp.directive:igTeam
 * @description
 * # igTeam
 */
angular.module('imaginationgameApp')
  .directive('igTeam', function () {
    return {
      templateUrl: 'views/templates/ig-team.html',
      restrict: 'E',
      scope: {
      	teamInfo: '=info',
      	teamClick: '&'
      }
    };
  });
