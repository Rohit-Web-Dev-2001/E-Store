"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaUsers,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";
import { AuthContext } from "@/app/Context/AuthContext";
import { AdminContext } from "@/app/Context/AdminContext";

const DashboardStats = () => {
  const { AuthData } = useContext(AuthContext);
  const { getProducts, getUsersforAdmin } = useContext(AdminContext);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchData = async () => {
    try {
      const res = await getProducts(AuthData);

      setTotalProducts(res?.length || 0);
      const TotalUsersres = await getUsersforAdmin(AuthData);
      setTotalUsers(TotalUsersres.length || 0);
      const soldSum = res?.reduce(
        (sum, product) => sum + (product.sold || 0),
        0
      );
      setTotalSold(soldSum || 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {/* Total Products */}
      <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4">
        <FaBoxOpen className="text-3xl text-blue-600" />
        <div>
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-semibold text-gray-800">
            {totalProducts}
          </div>
        </div>
      </div>

      {/* Total Users */}
      <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4">
        <FaUsers className="text-3xl text-green-600" />
        <div>
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-semibold text-gray-800">
            {totalUsers}
          </div>
        </div>
      </div>

      {/* Monthly Traffic */}
      <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4">
        <FaChartLine className="text-3xl text-purple-600" />
        <div>
          <div className="text-sm text-gray-500">Monthly Traffic</div>
          <div className="text-2xl font-semibold text-gray-800">4,560</div>
        </div>
      </div>

      {/* Total Orders (Sold) */}
      <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4">
        <FaShoppingCart className="text-3xl text-yellow-600" />
        <div>
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-semibold text-gray-800">
            {totalSold}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
