var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
module.exports = {
	createGame: function(req, res) {
		console.log("about to create a game".cyan);
		var game = new Game(req.body);
		game.save(function(err, game){
			if (err) {
				res.json(err);
			} else {
				res.sendStatus(200);
			}
		})
	},
	myGames: function(req, res){
		Game
			.find({
				$or: [
					{ 'playerOne._user': req.params.user_id},
					{ 'playerTwo._user': req.params.user_id}
				]
			})
			.exec(function(err, games){
				if(err){
					res.sendStatus(400);
				} else {
					res.json(games);
				}
			})
	}
} 