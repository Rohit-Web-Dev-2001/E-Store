"use client";
import AdminMain from "@/app/Components/Admin_Components/AdminPage";
import { AuthContext } from "@/app/Context/AuthContext";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
export default function Page() {

  const { AuthData, checkTokken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // ✅ Custom hook to protect route
  useAuthRedirect("admin", "/");
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // optional: can adjust or remove this delay

    return () => clearTimeout(timer);
  }, []);

  if (loading || !AuthData) {
    return (
      <div className="relative h-screen w-full bg-white">
        {/* Top Loading Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 animate-pulse z-50" />

        {/* Optional: Centered content or leave blank while loading */}
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading.....</p>
        </div>
      </div>
    );
  }
  return <AdminMain />;
}
