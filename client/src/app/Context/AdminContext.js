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

  const getProducts = async () => {
    try {
      const res = await API.get("/products/getproducts");
      return res?.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getUsersforAdmin,
        getProducts,
        addProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
