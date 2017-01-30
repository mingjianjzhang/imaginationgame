
/**
 * @ngdoc function
 * @name imaginationgameApp.controller:DashctrlCtrl
 * @description
 * # DashctrlCtrl 
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('DashCtrl', ['$rootScope', 'Marvel', 'ComicVine', 'Team', 'Game', 'Session', function ($rootScope, Marvel, ComicVine, Team, Game, Session) {

    var $ctrl = this;
    Session.getCurrent(function(user){
        console.log(user);
        Team.byUser(user._id, function(team){
          $ctrl.myTeams = team;
        });
    
        Game.myGames(user._id, function(games){
          $ctrl.myGames = games;
        });
    }) 
  }]);
