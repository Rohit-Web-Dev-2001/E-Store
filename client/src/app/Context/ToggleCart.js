"use client";
import React, { createContext, useState, useContext } from "react";
import { API } from "@/app/Utils/Utils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [BuyNowItem, setBuyNowItem] = useState(null);
  const [OrderList, setOrdersList] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const LogOut = () => {
    setCartItems([]);
    setOrdersList([]);
  };
  // Get Orders
  const getUserOrder = async (AuthData) => {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${AuthData.jwtToken}`;
      return req;
    });
    const res = await API.get("/products/getUserOrder");
    if (res?.data.success) {
      setOrdersList(res?.data.orders);
    } else {
      setOrdersList([]);
    }
  };
  // Solving live adding cart functionalty
  const addtocart = async (AuthData, body) => {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${AuthData.jwtToken}`;
      return req;
    });
    try {
      const res = await API.post("/products/addcart", body);
      setCartItems(res?.data.products || []);

      return res?.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const confirmOrder = async (AuthData, body) => {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${AuthData.jwtToken}`;
      return req;
    });
    try {
      const res = await API.post("/products/ConfirmOrder", body);

      return res?.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        confirmOrder,
        isOpen,
        toggleCart,
        addtocart,
        cartItems,
        setCartItems,
        isOrderModalOpen,
        setIsOrderModalOpen,
        BuyNowItem,
        setBuyNowItem,
        getUserOrder,
        OrderList,
        LogOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
