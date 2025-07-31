"use client";

import { useContext, useEffect } from "react";
import LandingPage from "./Components/HomePage/LandingPage";
import Navbar from "./Components/Navbar";
import { AuthContext } from "./Context/AuthContext";

export default function Home() {
  const { AuthData, checkTokken } = useContext(AuthContext);
  useEffect(() => {
    if (AuthData?.jwtToken) {
      console.log(AuthData?.jwtToken);

      checkTokken();
    }
  }, [AuthData]);
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}
