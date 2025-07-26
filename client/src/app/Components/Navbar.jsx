"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [showAuthButtons, setShowAuthButtons] = useState(false);
  const [islogin, setislogin] = useState(true);
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Brand */}
      <div className="text-2xl font-bold text-blue-600">EStore</div>

      {/* Right: Links + Logo */}
      <div className="flex items-center space-x-6">
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 cursor-pointer">Shop</li>
          <li className="hover:text-blue-500 cursor-pointer">About</li>
          <li className="hover:text-blue-500 cursor-pointer">Contact</li>
          <li className="hover:text-blue-500 cursor-pointer">Support</li>
        </ul>

        {/* Logo with Hover Actions */}
        <div
          className="relative group"
          onMouseEnter={() => setShowAuthButtons(true)}
          onMouseLeave={() => setShowAuthButtons(false)}
        >
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer">
            L
          </div>

          {/* Auth Buttons */}
          {showAuthButtons && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-2 flex flex-col space-y-2 z-10">
              {islogin ? (
                <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Logout
                </button>
              ) : (
                <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
