"use client";
import { AuthContext } from "@/app/Context/AuthContext";
import { useCart } from "@/app/Context/ToggleCart";
import React, { useContext, useState } from "react";

const BuyNowModel = ({ product }) => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    BuyNowItem,
    setBuyNowItem,
    confirmOrder,
  } = useCart();
  const { AuthData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: AuthData.name,
    address: "",
    mobileNo: "",
    email: AuthData.email,
  });
  const [quantity, setQuantity] = useState(1);

  // 👉 for success/error message
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    let OrderProductObj = {
      product: BuyNowItem,
      quantity,
      totalPrice: BuyNowItem.ProductPrice * quantity,
      ...formData,
    };

    try {
      const res = await confirmOrder(AuthData, OrderProductObj);

      // show message for 2 seconds
      setResponseMessage({
        success: res.success,
        message: res.message,
      }); // not empty State
      console.log(res);

      setTimeout(() => {
        setResponseMessage(null);
        setBuyNowItem(null);
        setIsOrderModalOpen(false);
        setFormData({ name: "", address: "", mobileNo: "", email: "" });
        setQuantity(1);
      }, 2000);

      // if (res.success) {
      //   setBuyNowItem(null);
      //   setIsOrderModalOpen(false);
      //   setFormData({ name: "", address: "", mobileNo: "", email: "" });
      //   setQuantity(1);
      // }
    } catch (err) {
      setResponseMessage({
        success: false,
        message: "Something went wrong!",
      });
      setTimeout(() => setResponseMessage(null), 2000);
    }
  };

  return (
    <>
      {/* Notification Message */}
      {responseMessage && (
        <div
          className={`fixed bottom-5 right-5 px-5 py-3 rounded-lg text-white shadow-lg z-[9999] text-lg font-medium ${
            responseMessage.success ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {responseMessage.message}
        </div>
      )}

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-md">
        <div className="bg-white rounded-2xl shadow-lg w-1/2 p-6 relative flex gap-6">
          {/* Close button */}
          <button
            onClick={() => {
              setFormData({ name: "", address: "", mobileNo: "", email: "" });
              setIsOrderModalOpen(false);
            }}
            className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Left Side → Product Image */}
          <div className="w-1/2 flex justify-center items-center px-5">
            <img
              src={BuyNowItem.ProductImage}
              alt={BuyNowItem.ProductName}
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>

          {/* Right Side → Details + Form */}
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold mb-2 pe-2">
              {BuyNowItem.ProductName}
            </h2>
            <p className="text-lg text-gray-700 mb-1">
              Price: ₹{BuyNowItem.ProductPrice}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-md font-medium text-gray-800">
                Total: ₹{BuyNowItem.ProductPrice * quantity}
              </p>
            </div>

            {/* Form */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Recipient Name"
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Mobile No"
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 rounded mb-3"
              required
            />

            <button
              onClick={handleConfirm}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNowModel;
