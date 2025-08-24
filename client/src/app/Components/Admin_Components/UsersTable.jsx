import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import { AuthContext } from "@/app/Context/AuthContext";
import { AdminContext } from "@/app/Context/AdminContext";


const UserTable = () => {
  const {  AuthData } = useContext(AuthContext);
  const { getUsersforAdmin } = useContext(AdminContext);
  const [userData, setUserData] = useState([]);

  const handlegetData = async () => {
    const res = await getUsersforAdmin(AuthData);
    setUserData(res || []);
  };

  useEffect(() => {
    handlegetData();
  }, []);

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 ">Custumor</h2>

      <div className="max-h-[100vh] overflow-y-auto hide-scrollbar">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b border-gray-500">
              <th className="py-2 px-1 text-center">S.no</th>
              <th className="py-2 px-1 text-center">Username</th>
              <th className="py-2 px-1 text-center">email</th>
              {/* <th className="py-2 px-4 text-center">Status</th> */}
            </tr>
          </thead>
        </table>

        <div className="max-h-100 overflow-y-auto">
          <table className="min-w-full text-sm text-gray-700">
            <tbody>
              {userData.map((user, i) => (
                <tr
                  key={user._id || i}
                  className="hover:bg-gray-50 transition border-b border-gray-200"
                >
                  <td className="py-2 px-4 text-center">{i + 1}</td>
                  <td className="py-2 px-4 text-center">
                    {user.firstName} {user.lastName}
                  </td>

                   <td className="py-2 px-4 text-center">
                    {user.email} 
                  </td>
                  {/* 
                  <td className="py-2 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          user.active ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span className={user.active ? "text-green-700" : "text-red-700"}>
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  */}
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
