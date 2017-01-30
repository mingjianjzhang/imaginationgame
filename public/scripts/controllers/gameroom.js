'use strict';

/**
 * @ngdoc function
 * @name imaginationgameApp.controller:GameroomCtrl
 * @description
 * # GameroomCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('GameRoomCtrl', ['socket', 'Game', 'Session', '$rootScope', '$routeParams', function (socket, Game, Session, $rootScope, $routeParams) {
 	var $ctrl = this;
 	Game.fetchGame($routeParams.id, function(game){
 		$ctrl.playerOne = game.playerOne._user.username
 		$ctrl.playerTwo = game.playerTwo._user.username
 	})
  }]);
