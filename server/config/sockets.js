module.exports = function(server) {
	var io = require("socket.io").listen(server)
	var mongoose = require('mongoose');
	var Game = mongoose.model('Game');
	var activeGames = {};

io.sockets.on('connection', function (socket) {
	socket.on("pass_game_id", function(gameID){
		socket.join(gameID); 
		Game
		.findById(gameID)
		.exec(function(err, game){
			activeGames[gameID] = game;
			console.log(activeGames[gameID], "i've been created!!");
		});
	})
	socket.on("new_move", function(moveInfo){
		// RESET function
		// currentGame.history = [];
		// currentGame.save();

		activeGames[moveInfo[0]].history.push(moveInfo[1]);
		activeGames[moveInfo[0]].save(function(err, game){
			if(err){
				console.log(err);
			} else {
				activeGames[moveInfo[0]] = game;
				io.sockets.in(moveInfo[0]).emit("saved_message", activeGames[moveInfo[0]]);
			}
		})
	})


});

}