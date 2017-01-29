'use strict';

/**
 * @ngdoc function
 * @name imaginationgameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imaginationgameApp
 */
angular.module('imaginationgameApp')
  .controller('MainCtrl', ['$rootScope', '$location', 'Session', 'socket', function ($rootScope, $location, Session, Marvel, socket) {
  	var $ctrl = this;
 //  	socket.emit("button_clicked", {reason: "from the angular factory"})
	// socket.on('server_response', function(data){
	// 	console.log('The Server Says:' + data.response);
	// })


	this.loginUser = function(creds){
		Session.login(creds, function(data){
			if (data.hasOwnProperty('errors')) {
				$ctrl.loginErrors = data.errors
			} else {
				console.log("What the hell is happening???");
				$rootScope.user = data;
				$location.path(`/dashboard`)
			}
		})
	}
	this.registerUser = function(user){
		console.log(user,"this is what is getting sent");
		Session.register(user, function(data){
			if(data.hasOwnProperty('errors')){
				console.log(data.errors);
				$ctrl.regErrors = data.errors
			} else if (data.hasOwnProperty("badPassword")){
				$ctrl.regErrors = data.badPassword
			} else {
				$location.path('/dashboard')
			}
		})
	}
	this.logout = function(){
		Session.logout(function(){
			$location.path('/');
		});
	}
  }]);