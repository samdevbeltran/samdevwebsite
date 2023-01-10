const express = require("express");
const app = new express();
const admins = require("../controllers/admins.controller");

app.post("/newadmin",admins.createAdmin);
app.get("/getadmins",admins.getAdmins);
app.put("/updateadmin/:id",admins.updateAdmin);
app.post("/login",admins.login);

module.exports = app;