var mongoose = require('mongoose');
var User = mongoose.model('User');
var Character = mongoose.model('Character');
var Team = mongoose.model('Team');
module.exports = {
	createCharacter: function(req, res){
		console.log("about to create a character".blue.underline);
		var character = new Character(req.body);
		character.save(function(err, character){
			if (err) {
				res.json(err);
			} else {
				res.sendStatus(200);
			}
		})
	},
	create: function(req, res){
		console.log("about to create a team".blue.underline);
		var team = new Team(req.body);
		team.save(function(err, team){
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log(team, "we did it".green);
				res.json(team);
			}
		})
	},
	getByUser: function(req, res){
		Team.find({_creator: req.params.id}, function(err, team){
			if (err){
				console.log(err);
			} else {
				res.json(team);
			}
		})
	}
}



