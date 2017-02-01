'use strict';

/**
 * @ngdoc function
 * @name imaginationgameApp.controller:DashmodalinstanceCtrl
 * @description
 * # DashmodalinstanceCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('DashModalInstanceCtrl', ['$uibModalInstance', 'Game', 'gameInfo', function ($uibModalInstance, Game, gameInfo) {
  		var $ctrl = this;
  		$ctrl.teams = gameInfo.teams;
  		$ctrl.game = gameInfo.game
  		console.log(gameInfo.game);
  		$ctrl.selectTeam = function(team) {
  			$ctrl.selectedTeam = team;
  		}
  		$ctrl.ok = function() {
  			$uibModalInstance.close($ctrl.selectedTeam);
  		}
  		$ctrl.cancel = function() {
  			$uibModalInstance.dismiss('cancel');
  		}
  }]);
