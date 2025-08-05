"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const { AuthData, logout } = useContext(AuthContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoggedIn = !!AuthData?.jwtToken;

  const handleLogout = () => {
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
          <li className="hover:text-blue-500 cursor-pointer">About</li>
          <li className="hover:text-blue-500 cursor-pointer">Contact</li>

          {isMounted && AuthData?.role === "user" && (
            <li className="hover:text-blue-500 cursor-pointer">Support</li>
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
          <li
            className="hover:text-blue-500 cursor-pointer flex gap-1"
            onClick={() => router.push("/Cart")}
          >
            <span>Cart</span>
            <FiShoppingCart size={18} />
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
