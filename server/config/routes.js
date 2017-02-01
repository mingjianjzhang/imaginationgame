var users = require("./../controllers/users.js");
var comicvine = require("./../controllers/comicvine.js");
var teams = require("./../controllers/teams.js");
var games = require("./../controllers/games.js");
module.exports = function(app) {
	app.post('/login', users.login);
	app.post('/users', users.register); 
	app.get('/currentUser', users.getCurrent);
	app.get('/users', users.getAll);
	app.delete('/logout', users.logout);
	app.get('/comicVineSearch/:name', comicvine.getCharacterByName);
	app.post('/characters', teams.createCharacter);
	app.post('/teams', teams.create);
	app.get('/teams/user/:id', teams.getByUser);
	app.post('/games', games.createGame);
	app.get('/games/user/:user_id', games.myGames);
	app.get('/games/:id', games.show);
	app.put('/game/:id/edit_team', games.editTeam);

	// Socket Routing
	
}

function userAuth(req, res, next){
	if (req.session.user) {
		next();
	} else {
		res.sendStatus(401);
	}
}