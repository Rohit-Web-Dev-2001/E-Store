"use client";
import React, { useState } from "react";

const AddToCartModal = ({ cartproduct, onClose, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const totalPrice = (Number(cartproduct.price) * quantity).toLocaleString(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
    }
  );

  const truncateName = (productName, wordLimit = 5) => {
    const words = productName.split(" ");

    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : words;
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-lg font-bold hover:text-red-500"
        >
          ×
        </button>

        {/* Product Info */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <img
              src={cartproduct.image}
              alt={cartproduct.productName}
              className="w-100 h-100 object-contain"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {truncateName(cartproduct.productName)}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {cartproduct.productDescription.slice(0, 120)}...
              </p>
              <p className="text-lg font-semibold mt-2 text-green-700">
                ₹{cartproduct.price}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleDecrement}
                className="px-3 py-1 text-lg border border-gray-300 rounded hover:bg-gray-100"
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-3 py-1 text-lg border border-gray-300 rounded hover:bg-gray-100"
              >
                +
              </button>
              <span className="ml-auto text-sm text-gray-500">
                Only: {totalPrice}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => onAddToCart(cartproduct, quantity)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => onBuyNow(cartproduct, quantity)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                🚀 Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
