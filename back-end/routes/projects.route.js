const express = require("express");
const app = new express();
const projects = require("../controllers/projects.controller");


app.get("/mostrar-proyectos",projects.getProjects);
app.get("/mostrar-proyectos-img/:id",projects.getImage);

module.exports = app;