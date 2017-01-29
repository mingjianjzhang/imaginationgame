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
	app.get('/teams/:id', teams.get);
	app.post('/games', games.createGame);
	app.get('/games/:user_id', games.myGames);

	// Socket Routing
	
}

function userAuth(req, res, next){
	if (req.session.user) {
		next();
	} else {
		res.sendStatus(401);
	}
}