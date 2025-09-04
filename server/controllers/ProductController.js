const CartModel = require("../Model/CartModel");
const { default: EsotreOrders } = require("../Model/OrderModel");
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

const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User is not valid" });
    }

    const orders = await EsotreOrders.find({ userId: id }).select(
      "-__v -updatedAt -userId -ProductId"
    ); // exclude fields;
    console.log(orders);

    if (!orders || orders.length === 0) {
      return res
        .json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getcartproducts = async (req, res) => {
  try {
    const { id } = req.user; // coming from JWT middleware

    if (!id) {
      return res.status(400).json({ message: "User ID missing in token" });
    }

    // 1. Find cart docs by userId
    const getProductsId = await CartModel.find({ userId: id }).select(
      "productId"
    );

    if (!getProductsId || getProductsId.length === 0) {
      return res.json({ error: "No products found in cart" });
    }

    // 2. Extract only productIds
    const productIds = getProductsId.map((product) => product.productId);

    if (productIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No productIds available in cart" });
    }

    // 3. Get product details using those productIds
    const getProductsData = await ProductModel.find({
      _id: { $in: productIds },
    }).select("productName image price stock productDescription");

    if (!getProductsData || getProductsData.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No product details found" });
    }

    return res.status(200).json({
      success: true,
      products: getProductsData,
    });
  } catch (error) {
    console.log(error);
  }

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

const deleteCartProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { id } = req.user; // from JWT middleware

    if (!id || !productId) {
      return res.status(400).json({ message: "UserId or ProductId missing" });
    }

    // Find and delete the cart item matching both userId and productId
    const deletedItem = await CartModel.findOneAndDelete({
      userId: id,
      productId: productId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      deletedItem,
    });
  } catch (error) {
    console.error("Error deleting cart product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while removing product",
      error: error.message,
    });
  }
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

const createOrder = async (req, res) => {
  try {
    const { id } = req.user; // userId from JWT middleware
    const { product, quantity, totalPrice, name, address, mobileNo, email } =
      req.body;

    // create new order document
    console.log(req.body);

    const newOrder = new EsotreOrders({
      userId: id,
      name,
      address,
      mobileNo,
      email,
      products: [
        {
          ProductId: product.productId, // assuming product is coming with _id
          ProductName: product.ProductName,
          ProductDescription: product.ProductDescription,
          ProductImage: product.ProductImage,
          ProductDescription: product.ProductDescription,
          ProductPrice: product.ProductPrice,
          Quantity: quantity,
          TotalAmount: totalPrice,
        },
      ],
    });

    //  now On ProductModel  Subtract the stock to quantity and add Sold to qunatity

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getProducts,
  deleteCartProduct,
  createOrder,
  updateProducts,
  addProducts,
  addToCart,
  getUserOrders,
  getcartproducts,
};
