const express = require("express");
const Userrouter = express.Router();
const { addUser ,verifyUser} = require("../controllers/UsersController");

Userrouter.post("/addUser", addUser);
Userrouter.post("/verfiyUser", verifyUser);

module.exports = Userrouter;
