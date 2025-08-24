"use client";
import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import { AuthContext } from "@/app/Context/AuthContext";
import { AdminContext } from "@/app/Context/AdminContext";

const ProductTable = () => {
  const {  AuthData } = useContext(AuthContext);
  const { getProducts,  } = useContext(AdminContext);
  const [ProductData, setProductData] = useState([]);

  // Fetch product data
  const handlegetData = async () => {
    const res = await getProducts(AuthData);
    setProductData(res || []);
  };

  useEffect(() => {
    handlegetData();
  }, []);

  // Debug: log updated product data


  // Determine stock status based on 'sold'
  const getStockStatus = (stock) => {

    if (stock === 0) return "Out of Stock";
    if (stock === 3) return "Low Stock";
    return "Active";
  };

  return (
    <div className="mt-6 mx-2 min-w-full p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 ">
        Products List
      </h2>

      <div className="hide-scrollbar  overflow-x-auto max-h-[450px] overflow-y-auto">
        <table className="min-w-full rounded-lg bg-white">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">S.No</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">In Stock</th>
              <th className="py-3 px-4 text-left">Sold</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {ProductData.map((product, index) => {
              const status = getStockStatus(product.stock);
              return (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div
                      className="max-w-[160px] truncate"
                      title={product.productName}
                    >
                      {product.productName}
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">{product.sold}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        status === "Active"
                          ? "bg-green-100 text-green-700"
                          : status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
