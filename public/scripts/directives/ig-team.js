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
      	team: '=',
      	teamClick: '&',
           memberSelect: '&' 
      },
      link: function(scope) {
          scope.memberClick = function(member) {
               console.log("inside directive scope");
               scope.memberSelect({member: member});
          }
      }
    };
  });
