const express = require("express");
const {
  getProducts,
  addProducts,
  deleteProducts,
  updateProducts,
} = require("../controllers/ProductController");
const ProductRouter = express.Router();

ProductRouter.get("/getproducts", getProducts);
ProductRouter.post("/addproducts", addProducts);
ProductRouter.delete("/deleteproducts", deleteProducts);
ProductRouter.put("/updateproducts", updateProducts);

module.exports = ProductRouter;
