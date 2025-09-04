const express = require("express");
const {
  getProducts,
  addProducts,
  updateProducts,
  addToCart,
  getcartproducts,
  deleteCartProduct,
  createOrder,
  getUserOrders,
} = require("../controllers/ProductController");
const ProductRouter = express.Router();
const ensureAuthenticated = require("../Middleware/Authenticator");
// const { AddManyUsers } = require("../controllers/AddManyUser");

ProductRouter.get("/getproducts", getProducts);
ProductRouter.get("/getUserOrder", ensureAuthenticated, getUserOrders);
ProductRouter.get("/getcartproducts", ensureAuthenticated, getcartproducts);
ProductRouter.post("/addproducts", ensureAuthenticated, addProducts);
ProductRouter.post("/addcart", ensureAuthenticated, addToCart);
ProductRouter.post("/ConfirmOrder", ensureAuthenticated, createOrder);

// ProductRouter.post("/addproducts", AddManyUsers);
ProductRouter.delete(
  "/RemoveCartProduct/:productId",
  ensureAuthenticated,
  deleteCartProduct
);

ProductRouter.delete("/deleteproducts", deleteCartProduct);
ProductRouter.put("/updateproducts", updateProducts);

module.exports = ProductRouter;
