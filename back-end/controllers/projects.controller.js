const Projects = require("../models/projects.model")
const fs = require("fs");

function getProjects(req,res){

	Projects.find({}).exec((err, data) => {

		if(err){

			return res.json({

				status : 500,
				message : "Error en la consulta"

			});
		}

		if(!data){

			return res.json({
				status : 400,
				message : "No hay projectos registrados"
			});
		}

		return res.json({
			status : 200,
			message : "Exito en la consulta",
			data

		});
		
	});

}

function getImage(req,res){

	const imgName = req.params.id;
	let path = `./files/img/projects/`

	//console.log(path)	

	fs.exists(path+imgName, function(response){
		
		if(!response){
			return res.json({
				status : 400,
				message : "No se encontro ninguna imagen con este nombre",
			
			});
		}

		return res.sendFile(imgName,{root : path});

	});

}

module.exports = { getProjects, getImage }