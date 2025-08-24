"use client";
import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/Context/AuthContext";
import { AdminContext } from "@/app/Context/AdminContext";

const AddToCartModal = ({ cartproduct, onClose, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const { addtocart } = useContext(AdminContext);
  const { AuthData } = useContext(AuthContext);
  const [notification, setNotification] = useState(null);

  const handleAddCart = async (cartproduct) => {
    const CartObj = {
      productId: cartproduct._id,
      productName: cartproduct.productName,
      price: cartproduct.price,
    };

    const res = await addtocart(AuthData, CartObj);
    console.log(res);

    setNotification({
      message: res.message,
      type: res.success ? "success" : "error",
    });

    // Hide after 1.5 seconds
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 1500);
  };

  const truncateName = (productName, wordLimit = 5) => {
    const words = productName.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : words;
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      {notification && (
        <div
          className={`fixed top-5 z-60 px-4 py-2 rounded-md text-white font-semibold shadow-lg 
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {notification.message}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-lg font-bold hover:text-red-500"
        >
          ×
        </button>

        {/* Product Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 ">
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

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleAddCart(cartproduct)}
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
