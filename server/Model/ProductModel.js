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
    enum: ["Mobile Phones", "Laptops"], 
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

const ProductModel = mongoose.model("E-StoreProducts", ProductSchema);
module.exports = ProductModel;
