"use client";
import { AdminContext } from "@/app/Context/AdminContext";
import { AuthContext } from "@/app/Context/AuthContext";
import { useCart } from "@/app/Context/ToggleCart";
import React, { useContext, useEffect, useState } from "react";

const CartSideBar = () => {
  const {
    isOpen,
    toggleCart,
    cartItems,
    setCartItems,
    setIsOrderModalOpen,
    setBuyNowItem,
  } = useCart();
  const { AuthData } = useContext(AuthContext);
  const { getCartProducts, RemoveCartProduct } = useContext(AdminContext);
  // Remove item
  const handleRemove = async (AuthData, id) => {
    await RemoveCartProduct(AuthData, id);
    const res = await getCartProducts(AuthData);

    setCartItems(res.products || []);

    // TODO: Call API to remove item
  };

  // Buy single item
  const handleBuy = async (
    productId,
    ProductName,
    ProductImage,
    ProductDescription,
    ProductPrice
  ) => {
    let ProductObj = {
      productId,
      ProductName,
      ProductImage,
      ProductDescription,
      ProductPrice,
    };

    setIsOrderModalOpen(true);
    setBuyNowItem(ProductObj);
    // TODO: Call API to buy single product
  };

  // Fetch cart products
  const fetchCartProducts = async (AuthData) => {
    try {
      const res = await getCartProducts(AuthData);

      if (res.error) {
        setCartItems([]);
      }

      setCartItems(res.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCartProducts(AuthData);
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">{AuthData?.name || "Guest"}</h2>
        <button onClick={toggleCart} className="text-gray-500">
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id || item.id}
              className="flex flex-col border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.productName}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleRemove(AuthData, item._id || item.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
                <button
                  disabled={item.stock === 0}
                  onClick={() =>
                    handleBuy(
                      item._id,
                      item.productName,
                      item.image,
                      item.productDescription,
                      item.price
                    )
                  }
                  className={`flex-1 ${
                    item.stock === 0
                      ? "bg-gray-500 "
                      : "bg-blue-500 hover:bg-blue-600"
                  } bg-blue-500 text-white py-1 rounded  text-sm`}
                >
                  {item.stock === 0 ? "Out of Stock" : "Buy Now"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty cart"
              className="w-20 h-20 opacity-70 mb-3"
            />
            <p className="text-gray-500 text-center text-lg">
              No products in cart
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          className={`w-full py-2 rounded text-white ${
            cartItems.length > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={cartItems.length === 0}
        >
          Buy All
        </button>
      </div>
    </div>
  );
};

export default CartSideBar;
