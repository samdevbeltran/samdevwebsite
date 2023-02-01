const express = require("express");
const app = new express();
const header = require("../controllers/header.controller");

app.get("/mostrar-header",header.getHeader);
app.get("/header-img/:id",header.getHeaderImg);

module.exports = app;
