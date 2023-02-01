const express = require("express");
const app = new express();
const skills = require("../controllers/skills.controller");

app.get("/mostrar-habilidades",skills.getSkills);
app.get("/mostrar-habilidad-img/:id",skills.getSkillImg);


module.exports = app;