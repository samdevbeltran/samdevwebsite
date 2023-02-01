const express = require("express");
const app = new express();
const about = require("../controllers/about.controller");

app.get("/mostrar-infopersonal",about.getAboutInfo);
app.get("/mostrar-infopersonal/img/:id",about.getAboutImg);


module.exports = app;