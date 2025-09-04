"use client";
import { AuthContext } from "@/app/Context/AuthContext";
import { useCart } from "@/app/Context/ToggleCart";
import React, { useContext, useEffect } from "react";

const OrdersList = () => {
  const { AuthData } = useContext(AuthContext);
  const { getUserOrder, OrderList } = useCart();

  const handleDownloadInvoice = (orderId) => {
    // 👉 Replace with your backend API call
    // Example: window.open(`/api/orders/${orderId}/invoice`, "_blank");
  };

  useEffect(() => {
    getUserOrder(AuthData); // fetch orders once on mount
  }, []);

  const Trimtitle = (title, chunkSize) => {
    const titleArray = title.split(" ");
    const trimmed = titleArray.slice(0, chunkSize).join(" ");
    console.log(trimmed);
    return trimmed;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {OrderList.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {OrderList.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-5 flex gap-5 items-center"
            >
              {/* Product Image */}
              <img
                src={order.products[0]?.ProductImage}
                alt={order.products[0]?.ProductName}
                className="w-28 h-28 object-cover rounded-lg border"
              />

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {Trimtitle(order.products[0]?.ProductName, 5)}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {Trimtitle(order.products[0]?.ProductDescription,15) ||
                    "No description available"}
                </p>
                <p className="text-gray-800 font-medium">
                  Price: ₹{order.products[0]?.ProductPrice}
                </p>
                <p className="text-gray-800">
                  Quantity: {order.products[0]?.Quantity} || Total Amount:{" "}
                  {order.products[0].TotalAmount}
                </p>
                <p className="text-gray-600 text-sm ">
                  <span className="font-medium">Address:</span> {order.address}
                </p>
              </div>

              {/* Invoice Button */}
              <button
                onClick={() => handleDownloadInvoice(order._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Download Invoice
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
