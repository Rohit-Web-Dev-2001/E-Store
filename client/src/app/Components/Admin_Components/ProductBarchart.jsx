"use client";
import { AdminContext } from "@/app/Context/AdminContext";
import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const ProductBarChart = ({ Catagory }) => {
  const { getProducts } = useContext(AdminContext);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getProducts();
      console.log(res);

      // Sort and map the data into the format required by recharts  && product.category ==="Mobile Phones"
      const filteredData = res
        .filter(
          (product) => product.sold > 0 && product.category === `${Catagory}`
        ) // ✅ exclude sold = 0
        .map((product) => ({
          name: product.productName.split(" ").slice(0, 3).join(" "), // limit to 3 words
          sales: product.sold,
        }))
        .sort((a, b) => b.sales - a.sales); // Optional: sort by highest

      setChartData(filteredData);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[800px] hide-scrollbar overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">
        {Catagory} Sales (High to Low) 
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-25}
            textAnchor="end"
            interval={0}
            height={70}
            tick={{ fontSize: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#3b82f6" barSize={20}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductBarChart;
