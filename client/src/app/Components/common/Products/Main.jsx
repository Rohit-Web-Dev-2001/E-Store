import React from "react";
import Navbar from "../Navbar";
import ProductContainer from "./ProductContainer";

const Main = ({ Category }) => {
  return (
    <div>
      <Navbar />
      <ProductContainer Category={Category} />
     
    </div>
  );
};

export default Main;
