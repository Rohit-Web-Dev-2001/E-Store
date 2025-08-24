"use client";

import axios from "axios";
import { API } from "@/app/Utils/Utils";
import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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

  const checkTokken = () => {
    const { jwtToken } = state;

    if (!jwtToken) return;

    try {
      const decoded = jwtDecode(jwtToken);
      const isExpired = decoded.exp * 1000 < Date.now(); // exp is in seconds

      if (isExpired) {
        console.log(isExpired);

        document.cookie =
          "E-StoreAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      console.error("Invalid token", err);
      // Optional: force logout if token is invalid
      dispatch({ type: "LOGOUT" });
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
        checkTokken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
