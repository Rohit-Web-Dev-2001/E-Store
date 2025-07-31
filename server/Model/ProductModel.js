const { default: mongoose } = require("mongoose");
const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
  },

  productDescription: {
    type: String,
  },

  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },

  category: {
    type: String,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    default: 0,
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;
