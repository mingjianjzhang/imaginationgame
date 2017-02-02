'use strict';

/**
 * @ngdoc directive
 * @name imaginationgameApp.directive:igBattleTeam
 * @description
 * # igBattleTeam
 */
angular.module('imaginationgameApp')
  .directive('igBattleTeam', function () {
    return {
      templateUrl: 'views/templates/ig-battle-team.html',
      restrict: 'E',
      scope: {
      	character: '=',
      	selected: '=',
      	move: '='
      },
      link: function(scope) {
      	scope.displayHealth = function(health){
      		if (health > 80) {
      			return "success";
      		} else if (health > 50) {
      			return "warning";
      		} else {
      			return "danger";
      		}
      	}
      	scope.$watch('move', function(move){
      		if(move){
	      		scope.$watch('selected', function(selected){
	      			if(selected){
	      				scope.possibleMove = move.toUpperCase();
	      			} else {
	      				scope.possibleMove = '';
	      			}
	      		})
      		}
      	})
    	}
    }
  });
// 