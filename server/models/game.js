var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 
var activeCharacterSchema = new Schema({
	name: {type: String, required: [true, "You must provide a name for each character"]},
	description: String,
	image: String,
	health: {type: Number, default: 100 },
	moves: [
		{
			name: String,
			class: String,
			damage: {
				display: String,
				min: Number,
				max: Number,
				base_x: Number,
				xp_x: Number
			},
			status_effect: String
		}
	]
})
mongoose.model('ActiveCharacter', activeCharacterSchema);

var playerSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User'},
	team: {
		name: String,
		members: [activeCharacterSchema]
	}
})
   
mongoose.model('Player', playerSchema);

var gameSchema = new Schema({
	playerOne: playerSchema,
	playerTwo: playerSchema,
	name: {type: String, required: [true, "You must provide a name for your game"]},
	history: [
		{
			player: String,
			message: {type: String, required: [true, "No blank messages allowed!"]}
		}
	]
})

mongoose.model('Game', gameSchema);