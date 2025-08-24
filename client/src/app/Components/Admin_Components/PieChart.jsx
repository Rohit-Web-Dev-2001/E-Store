import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Example data
const data = [
  { name: "Registered Users", value: 120 },
  { name: "Non-Registered Users", value: 80 },
];

const COLORS = ["#343cd3ff", "#9d0a0aff"]; // green and red

const UserPieChart = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full md:w-[400px]">
      <h2 className="text-xl font-semibold mb-4">User Registration Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPieChart;
