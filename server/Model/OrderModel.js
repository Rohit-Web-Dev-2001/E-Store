import mongoose from "mongoose";

const UserorderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: { type: String, required: true }, // root level
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    address: { type: String, required: true }, // single string

    products: [
      {
        ProductId: { type: String, required: true },
        ProductName: { type: String, required: true },
        ProductDescription: { type: String },
        ProductImage: { type: String },
        ProductPrice: { type: Number },
        Quantity: { type: Number },
        TotalAmount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);



const EsotreOrders = mongoose.model("EsotreOrders", UserorderSchema);

export default EsotreOrders;
