import React from "react";
import "./Style.css"


const users = [
  { id: 1, name: "Rohit Sharma", active: true },
  { id: 2, name: "Ayesha Khan", active: false },
  { id: 3, name: "Aman Verma", active: true },
  { id: 4, name: "Priya Patel", active: false },
  { id: 5, name: "John Doe", active: true },
  { id: 6, name: "Simran Kaur", active: false },
  { id: 7, name: "Nikhil Singh", active: true },
  { id: 8, name: "Fatima Sheikh", active: true },
  { id: 9, name: "Harsh Mehta", active: false },
  { id: 10, name: "Tina Desai", active: true },
  { id: 11, name: "Aditya Joshi", active: false },
  { id: 12, name: "Sneha Roy", active: true },
  { id: 13, name: "Imran Qureshi", active: true },
  { id: 14, name: "Kriti Bansal", active: false },
  { id: 15, name: "Abhay Kumar", active: true },
];

const UserTable = () => {
  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Users Status</h2>

     <div className="max-h-[100vh] overflow-y-auto hide-scrollbar">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="text-left border-b border-gray-500">
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
        </table>

        <div className="max-h-100 overflow-y-auto">
          <table className="min-w-full text-sm text-gray-700">
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition  border-b border-gray-200"
                >
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          user.active ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span
                        className={
                          user.active ? "text-green-700" : "text-red-700"
                        }
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
