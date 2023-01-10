require("./config.js");
const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');//para cargar y manipular archivos.. nota: en postman, se debe cambiar a form-data en caso de que queramos enviar archivos

/*=============================================
ABRIR PUERTO
==============================================*/

app.listen(process.env.PORT,()=>{

	console.log("puerto abierto en:"+process.env.PORT)

});

/*=============================================
MIDDLEWARES
==============================================*/

app.use(bodyParser.urlencoded({limit:"10mb",extended:true}));
app.use(bodyParser.json({limit:"10mb",extended:true}));

//app.use(fileUpload());

/*=============================================
RUTAS
==============================================*/
app.use(require("./routes/admins.route"));



/*=============================================
CONEXION A LA BASE DE DATOS
==============================================*/
mongoose.set('strictQuery', false);

connectToDB().catch(err => console.log(err));

async function connectToDB(){

	await mongoose.connect("mongodb://localhost:27017/samweb_db");

}

