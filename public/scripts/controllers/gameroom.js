'use strict';

/**
 * @ngdoc function
 * @name imaginationgameApp.controller:GameroomCtrl
 * @description
 * # GameroomCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('GameRoomCtrl', ['socket', 'Game', 'Session', '$rootScope', '$routeParams', 'hotkeys', '$scope', function (socket, Game, Session, $rootScope, $routeParams, hotkeys, $scope) {
 	var $ctrl = this;
 	$ctrl.valErrors = [];
 	$ctrl.typedName = '';
 	$ctrl.typedMove = '';
 	$ctrl.typedOpponent = '';
 	$ctrl.selectingOwnChar = false;
 	$ctrl.gameAlerts = [];
 	$ctrl.returnRightInput= function(){
 		if ($ctrl.selectingOwnChar){
	 		return $ctrl.typedName;
 		}
 		if ($ctrl.selectingOpponent){
 			return $ctrl.typedOpponent;
 		}
 		if ($ctrl.selectingMove){
 			return $ctrl.typedMove;
 		}
 	}
 	function resetGame(){
 		console.log('is this working?');
 		$ctrl.typedMove = '';
 		$ctrl.typedOpponent = '';
 		$ctrl.typedName = '';
 	}
 	// socket.on('connection', function(){
 	// })
 	hotkeys.bindTo($scope)
	    	.add({
		     	combo: 'alt+left',
		      description: 'blah blah',
		      callback: function() {
		      	$ctrl.selectingOwnChar = $ctrl.selectingOwnChar ? false : true
		      	if ($ctrl.selectingOwnChar){
		      		console.log("made it here");
		      		$ctrl.gameAlerts.push({id: "selectingChar", type: "alert-warning", msg: "Selecting character...", input: '$ctrl.typedName'});
		      	} else if (!$ctrl.selectingOwnChar && $ctrl.typedName && $ctrl.gameAlerts.length) {
		      		$ctrl.gameAlerts[0].type = 'alert-success';
		      		$ctrl.gameAlerts[0].msg = 'Hope you meant to select' + $ctrl.typedName; 
		      	}
		      }
		})
		.add({
		     	combo: 'alt+right',
		      description: 'blah blah',
		      callback: function() {
		      	$ctrl.selectingOpponent = $ctrl.selectingOpponent ? false : true
		    		console.log($ctrl.selectingOpponent);
		    		if ($ctrl.selectingOpponent){
		      		console.log("made it here");
		      		$ctrl.gameAlerts.push({id: "selectingChar", type: "alert-warning", msg: "Selecting opponent..."});
		      	} else if (!$ctrl.selectingOpponent && $ctrl.typedOpponent && $ctrl.gameAlerts.length) {
		      		$ctrl.gameAlerts[0].type = 'alert-success';
		      		$ctrl.gameAlerts[0].msg = 'Hope you meant to select ' + $ctrl.typedOpponent;
		      	}
		      }
		})
		.add({
		     	combo: 'alt+down',
		      description: 'blah blah',
		      callback: function() {
		      	$ctrl.selectingMove = $ctrl.selectingMove ? false : true
		      	console.log("selecting move!");
		      	if ($ctrl.selectingMove){
		      		console.log("made it here");
		      		$ctrl.gameAlerts.push({id: "selectingChar", type: "alert-warning", msg: "Selecting move...", input: '$ctrl.typedName'});
		      	} else if (!$ctrl.selectingMove && $ctrl.typedMove && $ctrl.gameAlerts.length) {
		      		$ctrl.gameAlerts[0].type = 'alert-success';
		      		$ctrl.gameAlerts[0].msg = 'Hope you meant to select ' + $ctrl.typedMove 
		      	}
		      }
		})
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
 			$ctrl.message = '';
	 		socket.emit("new_move", [ $routeParams.id, {player: $ctrl.activeUser._user.username, message: message}]);
	 		resetGame();
	 		// $ctrl.opponent.team.members[0].health -= 10;
 		} else {
 			$ctrl.valErrors.push("Please make a move before submitting");
 		}
 	}

 	$ctrl.isSelected = function(name){

 		if (name) {
	 		return name.toUpperCase() == $ctrl.typedName.toUpperCase() || name.toUpperCase() == $ctrl.typedOpponent.toUpperCase();
 		}
 	}
 	$ctrl.select = function(event){
;
 		if ($ctrl.selectingOwnChar){
 			if (event.which === 8){
 				$ctrl.typedName = $ctrl.typedName.slice(0, -1);
 			}
 			var letter = String.fromCharCode(event.which);
 			if (letter.match(/\w|\s/)) {
 				$ctrl.typedName+=letter;
 			}
			console.log($ctrl.typedName);
 		}

 		if ($ctrl.selectingMove){
 			if (event.which === 8){
 				$ctrl.typedMove = $ctrl.typedMove.slice(0, -1);
 			}
 			var letter = String.fromCharCode(event.which);
 			if (letter.match(/\w|\s/)) {
 				$ctrl.typedMove+=letter;
 			}
 			console.log($ctrl.typedMove);
 		}

 		if ($ctrl.selectingOpponent){
 			if (event.which === 8){
 				$ctrl.typedOpponent = $ctrl.typedOpponent.slice(0, -1);
 			}
 			var letter = String.fromCharCode(event.which);
 			if (letter.match(/\w|\s/)) {
 				$ctrl.typedOpponent+=letter;
 			}
 			console.log($ctrl.typedOpponent);
 		}
 	}
 	

 	$ctrl.dismissError = function(index){
 		$ctrl.valErrors.splice(index, 1);
 	};
 	$ctrl.dismissAlert = function(index){
 		$ctrl.gameAlerts.splice(index, 1);
 	}
 	socket.on("saved_message", function(game){
 		$ctrl.game = game;
 	})
  }]);
