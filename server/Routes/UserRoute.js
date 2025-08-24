const express = require("express");
const Userrouter = express.Router();
const {
  addUser,
  verifyUser,
  SignIn,
  SearchAdmin,
  getUsersData,
} = require("../controllers/UsersController");
const EStoreauthModel = require("../Model/authModel");
const ensureAuthenticated = require("../Middleware/Authenticator");

const Dummy = async (req, res) => {
  try {
    console.log(
      "Event triggred from frontEnd with this reqest :===>",
      req.body
    );
  } catch (error) {
    console.log(error);
  }
};
// Login Route
Userrouter.get("/getUsersData",ensureAuthenticated ,getUsersData);

Userrouter.post("/SignIn", SignIn);
// http://localhost:8000/auth/SignIn

// SignUp Route
Userrouter.post("/addUser", addUser);
// http://localhost:8000/auth/addUser

// VerfiyUser through Otp Route

Userrouter.post("/verfiyUser", verifyUser);
// http://localhost:8000/auth/verfiyUser

Userrouter.get("/admin/search", SearchAdmin);
// http://localhost:8000/auth/admin/search?name=rohit

module.exports = Userrouter;
