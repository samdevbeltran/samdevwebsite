const mongoose = require("mongoose");
const schema = mongoose.Schema;

const admins = new schema({
	username : {
		type : String,
		unique : true,
		required : [true,"El nombre de usuario es requerido"]
	},
	password : {
		type : String,
		required : [true, "La contraseña es requerida"]
	}
});

admins.method("toJSON",function(){
	let admin = this;
	let adminObject = admin.toObject();
	delete adminObject.password;
	return adminObject;
});
module.exports = mongoose.model("Admins",admins);