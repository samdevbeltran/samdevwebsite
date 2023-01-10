const Admins = require("../models/admin.model");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");

function getAdmins(req,res){

	Admins.find({}).exec( (err,data) => {
		
		if(err){
		
			return res.json({
		
				status : 400,
				message : "Error al hacer esta peticion"
		
			});
		
		}

		return res.json({
	
			status : 200,
			message : "Peticion exitosa",
			data
	
		});

	});
	
}


function createAdmin(req,res){

	let body = req.body;
	let saltRounds = 10;
	
	let admin = new Admins({

		username : body.username,
		password : bcrypt.hashSync(body.password,saltRounds)

	});

	
	admin.save((err,data) =>{

		if(err) return res.json({

			status : 500,
			message : "No se pudo crear el Administrador"

		});

		res.json({
			
			status : 200,
			message : "Administrador creado con exito",
			data

		});

	});	

}

function findAdminById(id){
	
	return new Promise(function(resolve,reject){
		Admins.findById(id).exec((err,data) =>{
		
			if(err) reject("No se encontro ningun Administrador con este id");

			resolve(data);
		});	
	})
	

}

function validatePassword(body,password){
	
	return new Promise((resolve,reject) => {

		if(!body.password){
			
			resolve(password);
		
		}else{

			resolve(bcrypt.hashSync(body.password,10));

		}

	});
}

function editAdmin(id,password,body){

	let newData = {
		
		username : body.username,
		password : password
	
	}

	return new Promise((resolve,reject) =>{
		
		Admins.findOneAndUpdate(id,newData,{ new : true, runValidators : true },function(error,result){
				
				if(result){
					
					resolve(result)

				}

				if(error){

					reject({status : 400,message : error});

				}
		
			}
		
		);	
	
	});
	

}


function updateAdmin(req,res){
	
	let body = req.body;
	let id = req.params.id
	
	findAdminById(id).then(result =>{
	
		if(result){
	
			validatePassword(body,result.password).then(pass =>{
	
				editAdmin(id,pass,body).then(editAdmin =>{

					res.json({
						status : 200,
						message : "Administrador actualizado con exito",
						data : editAdmin
					});

				}).catch(err =>{

					res.json({
						status : 400,
						err
					})

				});

			})
			
	
		}
	
	}).catch(err =>{
	
		res.json({
			status : 400,
			err
		})
	
	});

}


function comparePassword(password,dbPassword){

	return bcrypt.compareSync(password,dbPassword);
}

function login(req,res){
	
	let body = req.body;

	Admins.findOne({ username : body.username }).exec((err,result) => {
		
		if(err){

			return res.json({
				status : 400,
				message : "Error interno al buscar este administrador"
			});

		}

		if(!result){
			return res.json({
				status : 400,
				message : "Usuario no encontrado"
			});
		}

		
		if(!comparePassword(body.password,result.password)){
			return res.json({
				status : 401,
				message : "Contraseña incorrecta"
			});

		}

		let newToken = token.sign({result} ,process.env.SIGNATURE,{ expiresIn : "2h"});
		
		return res.json({
			status : 200,
			message : "Bienvenido, has iniciado sesión",
			newToken 
		})

	});
}
// 949635744, sambeltranesco20@gmail.com  I finished my first certificate, and now I want to keep study my second certificate as I plnned y my academic planner, but when I go to register the course, it tooks to my academic planer but it seems to be reseted, it is asking me choose a degree and select the certificates, why is it happening?
module.exports = { createAdmin, getAdmins, updateAdmin, login }