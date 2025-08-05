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
    const { role } = req.admin;
    if (!role === "admin") {
      res.status(500).json({ error: "Only Admin can access users data" });
    }
    const { productName, price, category, stock, image, productDescription } =
      req.body;
    if (
      !productName?.trim() ||
      !price ||
      !category?.trim() ||
      !stock ||
      !image?.trim() ||
      !productDescription?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required and must not be empty.",
        Fields: {
          productName: productName,
          price: price,
          category: category,
          stock: stock,
          image: image,
          productDescription: productDescription,
        },
      });
    }
    const newProduct = new ProductModel({
      productName,
      price,
      category,
      stock,
      image,
      productDescription,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
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
