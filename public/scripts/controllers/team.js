'use strict';

/**
 * @ngdoc function
 * @name imaginationgameApp.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('TeamCtrl', ['Marvel', 'ComicVine', 'Team', '$rootScope', '$location', 'setUserTeam', 'includesFilter', function (Marvel, ComicVine, Team, $rootScope, $location, setUserTeam, includesFilter) {
  	var $ctrl = this;
      $rootScope.user = { "_id" : "5850db882dbea25745a2b1d5",
           "username" : "ettuskitt", 
      };
  	this.selectedChar = {
          moves: []
      };
    
  	this.newTeam = {
          _creator: $rootScope.user._id,
          name: null,
          members: []
    }
    this.moves = [
      { 
        name: "Punch",
        type: "Physical",
        damage: {
          display: "1-3 damage + 1.05 per level",
          min: 0.1,
          max: 0.3,
          base_x: 10,
          xp_x: 1.05
        },
        status_effect: "None"
      },     
      { 
        name: "Kick",
        type: "Physical",
        damage: {
          display: "0-5 damage + 1.05 per level",
          min: 0.1,
          max: 0.3,
          base_x: 10,
          xp_x: 1.05
        },
        status_effect: "None"
      },      
      { 
        name: "Bad Breath",
        type: "Magic",
        damage: {
          display: "1 damage (+ .5 per level) every turn for 5 turns",
          min: 0,
          max: 0,
          base_x: 1,
          xp_x: .5
        },
        status_effect: "Poison"
      }
    ];

      if (setUserTeam.setUser) {
        Team.get($rootScope.user._id, function(data){
          $ctrl.userTeam = data;
          $ctrl.selectedChar = $ctrl.userTeam.members[0];
        })
      }
      


   	this.getCharacter = function(character, api){
   		$ctrl.completedSearch = false;
   		$ctrl.failedSearch = false;
            if( api === "Marvel") {
                Marvel.getCharacter(character, function(data){
                		console.log(data);
                	   if(data.description) {
                	   	   $ctrl.newChar.name = data.name;
	                    $ctrl.newChar.description = data.description;
	                    $ctrl.newChar.image = data.thumbnail.path + "." + data.thumbnail.extension;
	                    $ctrl.marvelImage = true;
	                    $ctrl.completedSearch = true;
                	   } else {
                	   	$ctrl.failedSearch = true;
                	   }
                })
            } else {
                ComicVine.getCharacter(character, function(data){
                	$ctrl.marvelImage = false;
                	console.log(data);
                	if (data.deck) {
                		$ctrl.newChar.name = data.name;
                    	$ctrl.newChar.description = data.deck;
                    	$ctrl.newChar.image = data.image.small_url;
                    	$ctrl.completedSearch = true;
                	} else {
                		$ctrl.failedSearch = true;
                	}
           })
            };
    	};
    	this.setAPI = function(api) {
     	   if (api === 'Marvel') {
     	       $ctrl.marvelSearch = true;
     	       $ctrl.comicSearch = false;
     	   } else { 
     	       $ctrl.comicSearch = true;
     	       $ctrl.marvelSearch = false;
     	   }
     	   $ctrl.api = api;
    	}
    	this.addToTeam = function() {
    	  $ctrl.newTeam.members.push(angular.copy($ctrl.newChar));
      };
      this.removeFromTeam = function(index){
        $ctrl.newTeam.members.splice(index, 1);
      }
      this.addCharacter = function(character){
        console.log(character, "This is what addCharacter is getting");
        Team.createCharacter(character, function(data){
          console.log(data, "data received in controller from Team.createCharacter");
        })
      }

      this.create = function(team){
        Team.create(team, function(data){

        })
        $location.path('/new_team/moves')
      }
      this.selectChar = function(index) {
        console.log($ctrl.userTeam.members[index]);
        $ctrl.selectedChar = $ctrl.userTeam.members[index];
        $ctrl.filteredMoves = includesFilter($ctrl.moves, $ctrl.selectedChar.moves);
      }

      this.get = function(){
        Team.get($rootScope.user._id, function(data){
          console.log(data);
          $ctrl.userTeam = data;
        })
      }

      this.addMove = function(index) {
        $ctrl.selectedChar.moves.push($ctrl.moves[index]);
        $ctrl.filteredMoves = includesFilter($ctrl.moves, $ctrl.selectedChar.moves);

      }

     
      this.printTeam = function(){
        console.log($ctrl.userTeam);
      }


  }]);
