var request = require('request');
module.exports = {
	getCharacterByName: function(req, res) {

		var options = {
			url: `http://comicvine.gamespot.com/api/characters/?api_key=6be0687d56d17025ac1c786ea5308e981b219df9&filter=name:${escape(req.params.name)}&format=json`,
			headers: {
				'User-Agent': 'ettuskitt'
			},
			json: true
		};
		console.log(options.url);
		function callback(error, response, body) {
			res.send(body.results[0]);
		}
		request(options, callback);
	}
}