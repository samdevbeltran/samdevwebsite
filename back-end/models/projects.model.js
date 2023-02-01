const mongoose = require('mongoose');
const schema = mongoose.Schema;

const projects = new schema({

	name : String,
	task : String,
	responsability : String,
	technologies : String,
	img : String,
	type : String,
	link : String


});

module.exports = mongoose.model("projects",projects);