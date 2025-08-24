const { default: mongoose } = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  createdAt: Date,
  updatedAt: Date,
});

const CartModel = mongoose.model("EStoreCart", CartSchema);
module.exports = CartModel;
