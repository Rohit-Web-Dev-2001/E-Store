"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/app/Context/ToggleCart";

const Navbar = () => {
  const { AuthData, logout } = useContext(AuthContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { toggleCart, cartItems, LogOut } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoggedIn = !!AuthData?.jwtToken;

  const handleLogout = () => {
    LogOut();
    logout(); // Clears context and cookies
    router.push("/"); // Triggers re-render
  };

  return (
    <nav className="bg-white shadow-md px-6 py-2 flex justify-between items-center">
      {/* Left: Brand and User Name */}
      <div className="font-bold text-blue-600 leading-tight">
        <span className="text-2xl font-bold">E-Store</span>
        <br />
        {isLoggedIn && isMounted && (
          <span className="text-sm text-gray-600">{AuthData?.name || ""}</span>
        )}
      </div>

      {/* Right: Navigation Links */}
      <div className="flex items-center space-x-6">
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Home
          </li>
          <li className="hover:text-blue-500 cursor-pointer">Contact</li>
          <li className="hover:text-blue-500 cursor-pointer">Support</li>

          {isMounted && AuthData?.role === "user" && (
            <li
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/Pages/Orders")}
            >
              Orders
            </li>
          )}

          {isMounted && AuthData?.role === "admin" && (
            <li
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => router.push("/Pages/Admin")}
            >
              Dashboard
            </li>
          )}
        </ul>

        {isMounted && AuthData?.role === "user" && (
          <li className="hover:text-yellow-500 cursor-pointer flex gap-1">
            <button className="relative" onClick={() => toggleCart()}>
              <FiShoppingCart size={25} />
              {cartItems && cartItems.length > 0 ? (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              ) : (
                ""
              )}
            </button>

            {/* {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )} */}
          </li>
        )}

        {/* Auth Button */}
        <div className="relative group p-2 z-10">
          {isLoggedIn && isMounted ? (
            <button
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => router.push("/Pages/Auth")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
