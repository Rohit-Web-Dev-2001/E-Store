const express = require("express");
const {
  getProducts,
  addProducts,
  deleteProducts,
  updateProducts,
  addToCart,
  getcartproducts,
} = require("../controllers/ProductController");
const ProductRouter = express.Router();
const ensureAuthenticated = require("../Middleware/Authenticator");
// const { AddManyUsers } = require("../controllers/AddManyUser");

ProductRouter.get("/getproducts", getProducts);
ProductRouter.get("/getcartproducts", getcartproducts);
ProductRouter.post("/addproducts", ensureAuthenticated, addProducts);
ProductRouter.post("/addcart", ensureAuthenticated, addToCart);

// ProductRouter.post("/addproducts", AddManyUsers);
ProductRouter.delete("/deleteproducts", deleteProducts);
ProductRouter.put("/updateproducts", updateProducts);

module.exports = ProductRouter;
