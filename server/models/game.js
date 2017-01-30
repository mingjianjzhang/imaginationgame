var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var playerSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User'},
	_team: {type: Schema.Types.ObjectId, ref: 'Team'},
	health: { type: Number, default: 100 }
})
  
mongoose.model('Player', playerSchema);

var gameSchema = new Schema({
	playerOne: playerSchema,
	playerTwo: playerSchema,
	name: {type: String, required: [true, "You must provide a name for your game"]},
	history: [
		{
			player: playerSchema,
			message: String
		}
	]
})

mongoose.model('Game', gameSchema);