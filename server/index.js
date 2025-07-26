const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/db");
const Userrouter = require("./Routes/AddUser");
require('dotenv').config()
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res)=>{
  res.send({mgs:"Server is ready to use"})
});
app.use("/auth",Userrouter);

app.listen(8000, () => {
  console.log("Server is connected");

});