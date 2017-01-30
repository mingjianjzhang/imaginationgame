
/**
 * @ngdoc function
 * @name imaginationgameApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('GameCtrl', ['socket', 'Game', 'Team', 'Session', 'notSelfFilter', '$rootScope', '$location', function (socket, Game, Team, Session, notSelfFilter, $rootScope) {
 	var $ctrl = this;
 	this.newGame = {};
 	Session.getCurrent(function(user){
 		console.log(user);
 		$ctrl.newGame.playerOne = { _user: user._id };
 		Team.byUser( user._id, function(teams){
 			$ctrl.myTeams = teams;
 		})
 		Game.fetchUsers(function(data){
			$ctrl.users = notSelfFilter(user, data);
		})
 	})

 	this.selectTeam = function(team){
 		$ctrl.selectedTeam = team.name
 		$ctrl.newGame.playerOne._team = team._id
 	}
 	this.setOpponent = function(index){
 		$ctrl.selectedOpponent = $ctrl.users[index].username;
 		$ctrl.newGame.playerTwo = { _user: $ctrl.users[index]._id }
 	}
 	this.createGame = function(game) {
 		Game.createGame(game, function(res){
 			$location.path('/dashboard');
 		})
 	}
 	socket.on("pass_messages", function(data){
 		$ctrl.messages = data.messages;
 		console.log($ctrl.messages, "this should be logging");
 	})
 	
  }]);
