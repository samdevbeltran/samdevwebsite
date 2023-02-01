const mongoose = require("mongoose");
const schema = mongoose.Schema;

const abouts = new schema({
	
	description : String,
	img : String

});

module.exports = mongoose.model("abouts",abouts);