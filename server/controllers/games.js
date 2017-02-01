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
			.populate({
				path: 'playerOne._user',
				select: 'username _id'
			})
			.populate({
				path: 'playerTwo._user',
				select: 'username _id'
			})
			.populate({
				path: 'playerOne._team'
			})
			.populate({
				path: 'playerTwo._team'
			})
			.exec(function(err, games){
				if(err){
					res.sendStatus(400);
				} else {
					var package = {
						active: [],
						incoming: [],
						outgoing: []
					};
					games.forEach(function(game){
						// console.log("inside game sorting function");
						// console.log("this is the id", req.params.user_id)
						// console.log(game.playerOne._user);
						if (game.playerOne._user._id == req.params.user_id) {
							if (game.playerTwo._team) {
								package.active.push(game);
							} else {
								package.outgoing.push(game);
							}
						};

						if (game.playerTwo._user._id == req.params.user_id) {
							if (game.playerTwo._team) {
								package.active.push(game);
							} else {
								package.incoming.push(game);
							}
						}

					})
					res.json(package);
				}
			})
	},
	show: function(req, res){
		Game
			.findById(req.params.id)
			.populate({
				path: 'playerOne._user',
				select: 'username'
			})
			.populate({
				path: 'playerTwo._user',
				select: 'username'
			})
			.populate( 'playerOne._team playerTwo._team')
			.exec(function(err, game){
				if(err){
					res.sendStatus(400);
				} else {
					res.json(game);
				}
			})
	},
	editTeam: function(req, res){
		Game
			.findByIdAndUpdate( req.params.id , { $set: { 'playerTwo._team': req.body.teamID}}, { new: 'true' }, function(err, game){
				console.log(game);
				res.sendStatus(200);
			})
	}

} 