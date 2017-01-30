
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
        $rootScope.user = user;
        Team.get($rootScope.user._id, function(team){
          $ctrl.myTeam = team;
        });
    
        Game.myGames($rootScope.user._id, function(games){
          $ctrl.myGames = games;
        });
    })
    

 
    
   
  }]);
