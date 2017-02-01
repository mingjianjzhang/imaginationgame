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
 	$ctrl.valErrors = [];
 	// socket.on('connection', function(){
 	// })

 	Session.getCurrent(function(user){
 		Game.fetchGame($routeParams.id, function(game){
 			$ctrl.game = game;
 			$ctrl.activeUser = user._id == game.playerOne._user._id ? game.playerOne : game.playerTwo;
 			$ctrl.opponent = user._id != game.playerOne._user._id ? game.playerOne : game.playerTwo;
 			socket.emit("pass_game_id", $routeParams.id);
 		})
 	})

 	$ctrl.makeMove = function(message){
 		if(message){
	 		socket.emit("new_move", [ $routeParams.id, {player: $ctrl.activeUser._user.username, message: message}]);
 		} else {
 			$ctrl.valErrors.push("Please make a move before submitting");
 		}
 	}

 	$ctrl.dismissError = function(index){
 		$ctrl.valErrors.splice(index, 1);
 	};
 	socket.on("saved_message", function(game){
 		$ctrl.game = game;
 	})
  }]);
