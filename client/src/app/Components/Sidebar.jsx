import React from "react";
import { FaHome, FaBox, FaUsers } from "react-icons/fa";

const Sidebar = ({setShowModal}) => {
  return (
    <div className="w-64 max-h-screen overflow-y-auto bg-gray-900 text-white shadow-md flex flex-col p-4 space-y-4">
      <div className="text-2xl font-bold mb-4">Admin</div>

      {/* Home */}
      <div className="flex items-center space-x-3 p-2 rounded cursor-pointer">
        <FaHome />
        <span>Home</span>
      </div>

      {/* Product Operation */}
      <div>
        <div className="flex items-center space-x-3 p-2 rounded cursor-pointer">
          <FaBox />
          <span>Product Operations</span>
        </div>
        <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm">
          <span className="p-2 rounded cursor-pointer hover:bg-gray-700" onClick={()=>setShowModal(true)}>Add Product</span>
          <span className="p-2 rounded cursor-pointer hover:bg-gray-700">Delete Product</span>
          <span className="p-2 rounded cursor-pointer hover:bg-gray-700">Update Product</span>
        </div>
      </div>

      {/* User Operation */}
      <div>
        <div className="flex items-center space-x-3 p-2 rounded cursor-pointer">
          <FaUsers />
          <span>User Operations</span>
        </div>
        <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm">
          <span className="p-2 rounded cursor-pointer hover:bg-gray-700">Remove User</span>
          <span className="p-2 rounded cursor-pointer hover:bg-gray-700">Update User</span>
        </div>
      </div>

          {/* Admin Operation */}
      <div>
        <div className="flex items-center space-x-3 p-2 rounded cursor-pointer">
          <FaUsers />
          <span>Admin Operations</span>
        </div>
        <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm">
          <span className="p-2 rounded cursor-pointer hover:bg-gray-700">Add Admin</span>
          <span className="p-2 rounded cursor-pointer hover:bg-gray-700">Remove Admin</span>
        </div>
      </div>
    </div>

    
  );
};

export default Sidebar;
