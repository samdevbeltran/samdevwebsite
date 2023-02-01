const mongoose = require('mongoose');
const schema = mongoose.Schema;

const headers = new schema({

	title : String,
	phrase : String,
	btn_primary_name : String,
	btn_secundary_name : String,
	img_name : String,
  	img_type : String

});

module.exports = mongoose.model("headers",headers);