"use client";
import React, { useState } from "react";
import DashboardStats from "./DashBoardStats";
import ProductTable from "./ProductTable";
import UserTable from "./UsersTable";
import UserPieChart from "./PieChart";
import ProductBarChart from "./PhoneBarchart";
import ProductFormModal from "./AddProduct";
import LaptopBarchart from "./LaptopBarchart";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddadminFormModal from "./Addadmin";

const AdminMain = () => {
  const [showModal, setShowModal] = useState(false);
  const [showaddAdminModal, setshowaddAdminModal] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar setShowModal={setShowModal} setshowaddAdminModal={setshowaddAdminModal} />
        <div className="  hide-scrollbar flex-1 p-5 overflow-y-auto h-screen">
          <DashboardStats />
          <div className="flex gap-4">
            <ProductBarChart />
            <LaptopBarchart />
          </div>
          <div className="flex gap-4">
            <div className="w-3/4">
              <ProductTable />
            </div>
            <div className=" w-1/4">
              <UserTable />
            </div>
          </div>
          {showModal && (
            <ProductFormModal onClose={() => setShowModal(false)} />
          )}

          {showaddAdminModal && (
            <AddadminFormModal onClose={() => setshowaddAdminModal(false)} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMain;
