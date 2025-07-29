"use client";

import { useContext, useEffect } from "react";
import LandingPage from "./Components/HomePage/LandingPage";
import Navbar from "./Components/Navbar";
import { AuthContext } from "./Context/AuthContext";

export default function Home() {
  const {AuthData} = useContext(AuthContext)
 
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}
