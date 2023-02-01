const Abouts = require("../models/about.model");
const fs = require("fs");

function getAboutInfo(req,res){

	Abouts.find({}).exec((err,data) => {

		if(err){
			
			return res.json({
				status : 500,
				message : "Error interno"
			});

		}


		if(!data){

			return res.json({
				status : 400,
				message : "No hay información"

			});

		}

		return res.json({

			status : 200,
			data

		});

	});

}

function getAboutImg(req,res){

	const imgName = req.params.id;
	const path = "./files/img/about/"
	
	fs.stat(`${path}${imgName}`,(err,stats) =>{

		if(err){
			
			return res.json({
				
				status : 500,
				err
			})
		}

		if(stats){
			
			return res.sendFile(imgName,{root:`${path}`})
			
		}
	})

}
module.exports = { getAboutInfo,getAboutImg }