"use client";

import axios from "axios";
import { API } from "@/Utils/Utils";
import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

// Initial state setup from cookies
let initialState = {};

if (typeof window !== "undefined") {
  const cookieData = Cookies.get("E-StoreAuth");
  initialState = cookieData
    ? JSON.parse(cookieData)
    : {
        email: "",
        jwtToken: "",
        name: "",
        userId: "",
      };
} else {
  initialState = {
    email: "",
    jwtToken: "",
    name: "",
    userId: "",
  };
}

// Create Context
export const AuthContext = createContext(initialState);

// Reducer
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const signinState = action.payload;
      Cookies.set("E-StoreAuth", JSON.stringify(signinState), { expires: 7 }); // persists for 7 days
      return signinState;
    case "LOGOUT":
      return { initialState: null };
    default:
      return state;
  }
};

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const SignUp = async (body) => {
    try {
      const res = await API.post("/auth/addUser", body);
      console.log("Response", res?.data);

      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const SignIn = async (body) => {
    try {
      const res = await API.post("/auth/SignIn", body);

      if (res?.data.error) {
        return res?.data;
        // return res?.data;
      } else {
        const { user, jwtToken } = res?.data;

        const Authdata = {
          email: user.email,
          jwtToken,
          name: user.name,
          role: user.role,
        };

        dispatch({ type: "SIGN_IN", payload: Authdata });
        return res?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    try {
      // 1. Remove JWT token cookie
      document.cookie =
        "E-StoreAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // 2. Clear auth data in context
      dispatch({ type: "LOGOUT" });

      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  };

  const VerifyOtp = async (body) => {
    try {
      const res = await API.post("/auth/verfiyUser", body);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        AuthData: state,
        VerifyOtp,
        logout,
        dispatch,
        SignUp,
        SignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
