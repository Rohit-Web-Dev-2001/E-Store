const ProductModel = require("../Model/ProductModel");

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find(); // Get all products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
const addProducts = async (req, res) => {
  try {
    const { productName, price, category, stock, image, productDescription } =
      req.body;
  } catch (error) {
    console.log(error);
  }
};

const deleteProducts = async (req, res) => {
  console.log("Edalasj");
};
const updateProducts = async (req, res) => {
  console.log("Edalasj");
};

module.exports = { getProducts, deleteProducts, updateProducts, addProducts };
