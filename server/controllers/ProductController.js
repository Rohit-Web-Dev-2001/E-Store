const CartModel = require("../Model/CartModel");
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

const getcartproducts = async (req, res) => {
  res.send("Hello");
};
const addProducts = async (req, res) => {
  try {
    const { role } = req.user;
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
const addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, price } = req.body;
    const productInCart = await CartModel.findOne({
      userId: id, // current user's cart
      "products.productId": productId, // match inside array
    });

    if (!productInCart) {
      cart = new CartModel({
        userId: id,
        productId: productId,
      });

      await cart.save();
      return res.send({
        success: true,
        message: "Product has been added to cart",
      });
    } else {
      return res.send({ success: false, message: "Product already exists " });
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  deleteProducts,
  updateProducts,
  addProducts,
  addToCart,
  getcartproducts,
};
