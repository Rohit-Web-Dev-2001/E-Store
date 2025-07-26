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
  { name: "MacBook Air M2 13-inch", sales: 150 },
  { name: "Dell XPS 13 Plus", sales: 130 },
  { name: "HP Spectre x360 14", sales: 110 },
  { name: "Lenovo Yoga 9i Gen 8", sales: 90 },
  { name: "Asus ROG Zephyrus G14", sales: 70 },
  { name: "Acer Swift X 14", sales: 50 },
];

const LaptopBarchart = () => {
  // Clone and sort the data to avoid mutation
  const sortedData = [...data].sort((a, b) => b.sales - a.sales);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[800px] hide-scrollbar overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">
        Product Sales (Highest to Lowest)
      </h2>
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

export default LaptopBarchart;
