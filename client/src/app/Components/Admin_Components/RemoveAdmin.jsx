import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/app/Context/AuthContext";

const RemoveAdminModal = ({ onClose }) => {
  const { AuthData, getUsersforAdmin } = useContext(AuthContext);
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchAllAdmins = async () => {
    try {
      setLoading(true);
      const res = await getUsersforAdmin(AuthData);
      console.log(res);
      setAdminList(res);
    } catch (error) {
      console.error("Error fetching admin list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRemove = async (adminId) => {
    try {
      await axios.delete(`/api/admins/remove/${adminId}`); // Update this route if needed
      setAdminList((prev) => prev.filter((admin) => admin._id !== adminId));
      setSelectedId(null);
    } catch (error) {
      console.error("Error removing admin:", error);
    }
  };

  const handleCancel = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Remove Admin</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading admins...</p>
        ) : adminList.length === 0 ? (
          <p className="text-center text-gray-500">No admins found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminList
                  .filter((admin) => admin.role === "admin")
                  .map((admin) => (
                    <tr key={admin._id} className="text-center">
                      <td className="px-4 py-2 border">{admin.firstName}</td>
                      <td className="px-4 py-2 border">{admin.lastName}</td>
                      <td className="px-4 py-2 border">{admin.email}</td>
                      <td className="px-4 py-2 border space-x-2">
                        {selectedId === admin._id ? (
                          <>
                            <button
                              className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                              onClick={() => handleConfirmRemove(admin._id)}
                            >
                              Confirm
                            </button>
                            <button
                              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                            onClick={() => setSelectedId(admin._id)}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveAdminModal;
