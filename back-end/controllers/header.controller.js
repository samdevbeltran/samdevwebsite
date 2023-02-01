const Header = require("../models/header.model");
const fs = require("fs");

function getHeader(req,res){

	Header.find({}).exec((err,data)=>{

		if(err){
			return res.json({
				status : 500,
				message : "error en la consulta"
			});
		}

		if(!data){

			return res.json({
				status : 400,
				message : "No hay informacion de header en la base de datos"
			});
		}

		return res.json({
			status : 200,
			message : "Exito en la consulta",
			data
		});


	});
	

}

function getHeaderImg(req,res){

	let id = req.params.id;
	let options = {

		root : "./files/img/header/"
	};

	fs.exists(`${options.root}${id}`, result => {

		if(!result){
			return res.json({

				status : 500,
				message : "No existe esta imagen"

			});
		}

		return res.sendFile(id,options);

	});

}

module.exports = { getHeader, getHeaderImg }