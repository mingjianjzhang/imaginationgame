
/**
 * @ngdoc function
 * @name imaginationgameApp.controller:DashctrlCtrl
 * @description
 * # DashctrlCtrl 
 * Controller of the imaginationgameApp
 */
 
angular.module('imaginationgameApp')
  .controller('DashCtrl', ['$rootScope', '$uibModal', 'Marvel', 'ComicVine', 'Team', 'Game', 'Session', function ($rootScope, $uibModal, Marvel, ComicVine, Team, Game, Session) {

    var $ctrl = this;
    Session.getCurrent(function(user){
        $ctrl.user = user;
        Team.byUser(user._id, function(teams){
          $ctrl.myTeams = teams;
        });
    
        Game.myGames(user._id, function(games){
          $ctrl.myGames = games;
        });
    }) 
    $ctrl.openModal = function(game){
        var modalInstance = $uibModal.open({
          controller: 'DashModalInstanceCtrl',
          controllerAs: 'dashModal',
          size: 'lg',
          resolve: {
              gameInfo: function() {
                  return {
                      teams: $ctrl.myTeams,
                      game: game
                  }
              }
          },
          templateUrl: 'views/templates/character_select.html'
        });

        modalInstance.result.then(function(team){
            Game.setTeam(game._id, team, function(res){
                console.log("Made it back!")
                Game.myGames($ctrl.user._id, function(games){
                    console.log("resetting games");
                    $ctrl.myGames = games;
                });
            })
        }, function (){
            console.log("I got cancelled man");
        })
    }
  }]);
