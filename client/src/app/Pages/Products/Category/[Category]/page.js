"use client";
import CartSideBar from "@/app/Components/common/CartSideBar";
import BuyNowModel from "@/app/Components/common/Products/BuyNowModel";
import Main from "@/app/Components/common/Products/Main";
import { AuthContext } from "@/app/Context/AuthContext";
import { useCart } from "@/app/Context/ToggleCart";
import React, { use, useContext, useState, useEffect } from "react";

const Page = ({ params }) => {
  const { isOrderModalOpen } = useCart();
  const { Category } = use(params); // ✅ Unwrap the Promise
  const { AuthData, checkTokken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
    <div>
      <Main Category={Category} />
      <CartSideBar />
      {isOrderModalOpen && <BuyNowModel />}
    </div>
  );
};

export default Page;
