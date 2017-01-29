
/**
 * @ngdoc function
 * @name imaginationgameApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('GameCtrl', ['socket', 'Game', 'Session', 'notSelfFilter', '$rootScope', function (socket, Game, Session, notSelfFilter, $rootScope) {
 	var $ctrl = this;
 	this.newGame = {};
 	Session.getCurrent(function(user){
 		$rootScope.user = user;
 		$ctrl.newGame.playerOne = { _user: $rootScope.user._id }
 		console.log("anything??");
		console.log($rootScope.user, "where is this?")
 		Game.fetchUsers(function(data){
			$ctrl.users = notSelfFilter($rootScope.user, data);
		})
 	})

  
 
 	this.setOpponent = function(index){
 		$ctrl.selectedOpponent = $ctrl.users[index];
 		$ctrl.newGame.playerTwo = { _user: $ctrl.selectedOpponent._id }
 	}
 	this.createGame = function(game) {
 		Game.createGame(game, function(res){
 			console.log("we did it!");
 		})
 	}
 	socket.on("pass_messages", function(data){
 		$ctrl.messages = data.messages;
 		console.log($ctrl.messages, "this should be logging");
 	})
 	
  }]);
