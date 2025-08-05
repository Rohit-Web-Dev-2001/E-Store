"use client";
import Main from "@/app/Components/common/Products/Main";
import React, { use } from "react";

const Page = ({ params }) => {
  const { Category } = use(params); // ✅ Unwrap the Promise

  return (
    <div>
      <Main Category={Category} />
    </div>
  );
};

export default Page;
