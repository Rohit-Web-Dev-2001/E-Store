const express = require("express");
const Userrouter = express.Router();
const {
  addUser,
  verifyUser,
  SignIn,
} = require("../controllers/UsersController");

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

Userrouter.post("/SignIn", SignIn);

// SignUp Route
Userrouter.post("/addUser", addUser);

// VerfiyUser through Otp Route

Userrouter.post("/verfiyUser", verifyUser);

module.exports = Userrouter;
