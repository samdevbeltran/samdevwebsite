const Skills = require("../models/skills.model")
const fs = require("fs");

function getSkills(req,res){
	
	Skills.find({}).exec((err,data) =>{

		if(err){
			return res.json({
				status : 500,
				message : "Error en el servidor"
			});
		}	

		if(!data){
			return res.json({
				status : 400,
				message : "No hay ningun skill"
			});
		}

		return res.json({

			status : 200,
			data
			
		});

	});
	
}

function getSkillImg(req,res){

	const imgName = req.params.id
	const path = "./files/img/skills/";

	fs.stat(`${path}${imgName}`,(err,status) => {

		if(err){
			return res.json({

				status : 500,
				message : "Error en el servidor"
			});

		}

		return res.sendFile(imgName,{root : path});
	});


}


module.exports = { getSkills , getSkillImg}