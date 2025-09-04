"use client";

import { createContext, useReducer } from "react";
import { API } from "@/app/Utils/Utils";
import Cookies from "js-cookie";

// Initial State
const initialAdminState = {
  users: [],
  products: [],
};

// Context
export const AdminContext = createContext(initialAdminState);

// Provider
export const AdminProvider = ({ children }) => {
  const getUsersforAdmin = async (authData) => {
    try {
      API.interceptors.request.use((req) => {
        req.headers.authorization = `Bearer ${authData.jwtToken}`;
        return req;
      });

      const res = await API.get("/auth/getUsersData");
      return res?.data;
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const addProduct = async (authData, body) => {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${authData.jwtToken}`;
      return req;
    });
    const res = await API.post("/products/addproducts", body);
    return res?.data;
  };

  const getProducts = async (body) => {
    try {
      const res = await API.get("/products/getproducts", body);
      return res?.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const addtocart = async (AuthData, body) => {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${AuthData.jwtToken}`;
      return req;
    });
    try {
      const res = await API.post("/products/addcart", body);
      return res?.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const getCartProducts = async (AuthData) => {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${AuthData.jwtToken}`;
      return req;
    });
    try {
      const res = await API.get("/products/getcartproducts");

      return res?.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const RemoveCartProduct = async (AuthData, Productid) => {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${AuthData.jwtToken}`;
      return req;
    });
    try {
      const res = await API.delete(`/products/RemoveCartProduct/${Productid}`);

      return res?.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getUsersforAdmin,
        addtocart,
        getProducts,
        addProduct,
        getCartProducts,
        RemoveCartProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
