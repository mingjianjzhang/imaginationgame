var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

console.log("Accessing Team Model".yellow);

var characterSchema = new Schema({
	name: {type: String, required: [true, "You must provide a name for each character"]},
	description: String,
	image: String,
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
 
mongoose.model('Character', characterSchema);

var teamSchema = new Schema({
	_creator: {type: Schema.Types.ObjectId, ref: 'User'},
	name: {type: String, required:[true, "You must give your team a name"], minlength: [2, "Your team name must be longer than 2 characters"]},
	members: [characterSchema]
})
mongoose.model('Team', teamSchema);
