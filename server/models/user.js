var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
console.log("Accessing User Model".blue.underline);
// email regex
var match = [	
/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, "Invalid email address"]

var UserSchema = new Schema({
	first_name: {type: String, required:[true, "You must provide a first name"], minlength: [2, "Your first name is longer than 2 characters, isn't it?"]},
	last_name: {type: String, required:[true, "You must provide a last name"], minlength: [2, "Your last name is longer than 2 characters, isn't it?"]},
	username: {type: String, required: [true, "You must provide a username"], minlength: [6, "Your username must be at least 6 characters long"]},
	email: {type: String, required:[true, "You must provide an email address"], match: match},
	password: {type: String, required: [true, "You must provide a password"], minlength: [8, "Your password must be at least 8 characters long"]}	
});
mongoose.model("User", UserSchema);