"use client";

import SignInPage from "@/app/Components/Auth/SignIn";
import SignupPage from "@/app/Components/Auth/SIgnUp";
import { useState } from "react";

export default function Home() {
  const [isSignIn, setisSignIn] = useState(true);
  return (
    <>
      {isSignIn ? (
        <SignInPage setisSignIn={setisSignIn} />
      ) : (
        <SignupPage setisSignIn={setisSignIn} />
      )}
    </>
  );
}
