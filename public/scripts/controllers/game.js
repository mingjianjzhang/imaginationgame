
/**
 * @ngdoc function
 * @name imaginationgameApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('GameCtrl', ['socket', 'Game', 'Team', 'Session', 'notSelfFilter', '$rootScope', '$location', function (socket, Game, Team, Session, notSelfFilter, $rootScope, $location) {
 	var $ctrl = this;
 	$ctrl.valErrors = [];
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
 		$ctrl.newGame.playerOne.team = { name: team.name, members: team.members }
 	}
 	this.setOpponent = function(index){
 		$ctrl.selectedOpponent = $ctrl.users[index].username;
 		$ctrl.newGame.playerTwo = { _user: $ctrl.users[index]._id }
 	}
 	this.createGame = function(game) {

 		if (!$ctrl.selectedTeam){
 			$ctrl.valErrors.push("Please select a team before proceeding");
 		} else {
	 		Game.createGame(game, function(res){
	 			$location.path('/dashboard');
	 		})
 		}
 	}
 	
 	$ctrl.dismissError = function(index){
 		$ctrl.valErrors.splice(index, 1);
 	};

  }]);
