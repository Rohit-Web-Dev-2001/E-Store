"use client";
import React, { useEffect, useState } from "react";
import { FaHome, FaBox, FaUsers, FaBars } from "react-icons/fa";

const Sidebar = ({
  setShowModal,
  setshowaddAdminModal,
  setshowaddRmoveAdminModal,
}) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShowSidebar(false);
        setIsMobile(true);
      } else {
        setShowSidebar(true);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Top Bar with Icons */}
      {isMobile && (
        <div className=" top-0 left-0 h-screen w-16 bg-gray-900 text-white p-2 shadow-md z-50 flex flex-col items-center justify-start space-y-4 pt-4">
          <button onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars size={24} />
          </button>

          {/* Other icons (only show when sidebar is hidden) */}
          {!showSidebar && (
            <div className="flex flex-col items-center space-y-4 mt-6 text-gray-300 gap-10">
              <FaHome
                size={20}
                title="Home"
                onClick={() => setShowSidebar(!showSidebar)}
              />
              <FaBox
                size={20}
                title="Product Ops"
                onClick={() => setShowSidebar(!showSidebar)}
              />
              <FaUsers
                size={20}
                title="User Ops"
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </div>
          )}
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div
          className={`${
            isMobile ? "fixed top-0 left-16 z-40" : "static"
          } w-64 h-screen bg-gray-900 text-white shadow-md flex flex-col p-4 space-y-4 transition-all`}
        >
        

          <div className="text-2xl font-bold mb-4">Admin</div>

          {/* Home */}
          <div className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-700">
            <FaHome />
            <span>Home</span>
          </div>

          {/* Product Operations */}
          <div>
            <div className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-700">
              <FaBox />
              <span>Product Operations</span>
            </div>
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm">
              <span
                className="p-2 rounded cursor-pointer hover:bg-gray-700"
                onClick={() => setShowModal(true)}
              >
                Add Product
              </span>
              <span className="p-2 rounded cursor-pointer hover:bg-gray-700">
                Delete Product
              </span>
              <span className="p-2 rounded cursor-pointer hover:bg-gray-700">
                Update Product
              </span>
            </div>
          </div>

          {/* User Operations */}
          <div>
            <div className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-700">
              <FaUsers />
              <span>User Operations</span>
            </div>
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm">
              <span className="p-2 rounded cursor-pointer hover:bg-gray-700">
                Remove User
              </span>
              <span className="p-2 rounded cursor-pointer hover:bg-gray-700">
                Update User
              </span>
            </div>
          </div>

          {/* Admin Operations */}
          <div>
            <div className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-700">
              <FaUsers />
              <span>Admin Operations</span>
            </div>
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm">
              <span
                className="p-2 rounded cursor-pointer hover:bg-gray-700"
                onClick={() => setshowaddAdminModal(true)}
              >
                Add Admin
              </span>
              <span
                className="p-2 rounded cursor-pointer hover:bg-gray-700"
                onClick={() => setshowaddRmoveAdminModal(true)}
              >
                Remove Admin
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
