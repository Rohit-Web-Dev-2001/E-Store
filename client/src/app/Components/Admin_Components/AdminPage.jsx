"use client";
import React, { useState } from "react";
import DashboardStats from "./DashBoardStats";
import ProductTable from "./ProductTable";
import UserTable from "./UsersTable";
import UserPieChart from "./PieChart";
import ProductBarChart from "./ProductBarchart";
import ProductFormModal from "./AddProduct";
import LaptopBarchart from "./LaptopBarchart";
import Navbar from "../common/Navbar";
import Sidebar from "./Sidebar";
import AddadminFormModal from "./Addadmin";
import RemoveAdminModal from "./RemoveAdmin";

const AdminMain = () => {
  const [showModal, setShowModal] = useState(false);
  const [showaddAdminModal, setshowaddAdminModal] = useState(false);
  const [showaddRmoveAdminModal, setshowaddRmoveAdminModal] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar
          setShowModal={setShowModal}
          setshowaddAdminModal={setshowaddAdminModal}
          setshowaddRmoveAdminModal={setshowaddRmoveAdminModal}
        />
        <div className="  hide-scrollbar flex-1 overflow-y-auto h-screen">
          <Navbar />

          <DashboardStats />
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <ProductBarChart Catagory="Mobile Phones" />
            <ProductBarChart Catagory="Laptops" />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
            <div className="w-full lg:w-3/5">
              <ProductTable />
            </div>
            <div className="w-full lg:w-2/5">
              <UserTable />
            </div>
          </div>

          {showModal && (
            <ProductFormModal onClose={() => setShowModal(false)} />
          )}

          {showaddAdminModal && (
            <AddadminFormModal onClose={() => setshowaddAdminModal(false)} />
          )}
          {showaddRmoveAdminModal && (
            <RemoveAdminModal
              onClose={() => setshowaddRmoveAdminModal(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMain;
