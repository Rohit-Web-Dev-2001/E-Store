"use client";

import { useContext, useEffect, useState } from "react";
import LandingPage from "./Components/common/LandingPage";
import Navbar from "./Components/common/Navbar";
import { AuthContext } from "./Context/AuthContext";
import CartSideBar from "./Components/common/CartSideBar";
import BuyNowModel from "./Components/common/Products/BuyNowModel";
import { useCart } from "./Context/ToggleCart";

export default function Home() {
  const { AuthData, checkTokken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { isOrderModalOpen } = useCart();

  useEffect(() => {
    if (AuthData?.jwtToken) {
      checkTokken();
    }

    // Add a slight delay to simulate loading or wait for AuthData
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // optional: can adjust or remove this delay

    return () => clearTimeout(timer);
  }, [AuthData]);

  if (loading || !AuthData) {
    return (
      <div className="relative h-screen w-full bg-white">
        {/* Top Loading Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 animate-pulse z-50" />

        {/* Optional: Centered content or leave blank while loading */}
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {AuthData?.role === "user" && <CartSideBar />}
      <LandingPage />
      {isOrderModalOpen && <BuyNowModel />}
    </>
  );
}
