"use client";
import { AuthContext } from "@/app/Context/AuthContext";
import React, { useContext, useEffect } from "react";

export default function Page() {
  const { AuthData, checkTokken } = useContext(AuthContext);
  useEffect(() => {
    if (AuthData?.jwtToken) {
      console.log(AuthData?.jwtToken);

      checkTokken();
    }
  }, [AuthData]);
  return <div>Hello</div>;
};

