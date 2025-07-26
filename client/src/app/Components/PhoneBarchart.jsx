import React from "react";
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

// Example product sales data
const data = [
  { name: "iPhone 14 Pro Max", sales: 150 },
  { name: "Samsung Galaxy S22 Ultra", sales: 120 },
  { name: "MacBook Air M2 13-inch", sales: 90 },
  { name: "Redmi Note 12 Pro", sales: 60 },
  { name: "Dell XPS 13 Plus", sales: 45 },
  { name: "OnePlus 12R 5G", sales: 30 },
];

const ProductBarChart = () => {
  // Clone and sort the data to avoid mutation
  const sortedData = [...data].sort((a, b) => b.sales - a.sales);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[800px] hide-scrollbar overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Product Sales (Best to Low)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={sortedData}
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
            {sortedData.map((_, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductBarChart;
