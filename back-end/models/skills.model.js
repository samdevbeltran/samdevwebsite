const mongoose = require("mongoose");
const schema = mongoose.Schema;

const skills = new schema({

	name : String,
	range : Number,
	img : String

})

module.exports = mongoose.model("skills",skills);