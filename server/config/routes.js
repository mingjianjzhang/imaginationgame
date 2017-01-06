var users = require("./../controllers/users.js");
var comicvine = require("./../controllers/comicvine.js");
var teams = require("./../controllers/teams.js");
module.exports = function(app) {
	app.post('/login', users.login);
	app.post('/users', users.register);
	app.get('/currentUser', users.getCurrent);
	app.delete('/logout', users.logout);
	app.get('/comicVineSearch/:name', comicvine.getCharacterByName);
	app.post('/characters', teams.createCharacter);
	app.post('/teams', teams.create);
	app.get('/teams/:id', teams.get);
}

function userAuth(req, res, next){
	if (req.session.user) {
		next();
	} else {
		res.sendStatus(401);
	}
}