"use client";

import { AuthContext } from "@/app/Context/AuthContext";
import React, { useContext, useState } from "react";
import VerifyOtp from "./VerifyOtp";

const SignupPage = ({ setisSignIn }) => {
  const { SignUp } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userPayload = {
      firstName,
      lastName,
      email,
      password,
    };

    const res = await SignUp(userPayload);

    if (!res?.message) {
      setError(res.message);
    } else {
      setUserEmail(email);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setSuccess(false);
        setIsVerify(true); // Show OTP verification
      }, 1500);
    }
  };

  // ✅ Show OTP Component After Successful Signup
  if (isVerify) {
    return <VerifyOtp email={userEmail} setisSignIn={setisSignIn} />;
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white relative">
        {success && (
          <div className="absolute top-6 bg-green-500 text-white px-6 py-2 rounded-md shadow-lg text-sm font-medium animate-bounce">
            Registered Successfully!
          </div>
        )}

        <div className="bg-white w-full max-w-md p-8 border border-gray-200 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#101828]">
            Register to E-Store
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Your gateway to the latest gadgets and unbeatable deals starts here.
          </p>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center font-medium">
              {error}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-sm"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-sm"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-sm"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-sm"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-sm"
            />

            <button
              type="submit"
              className="w-full text-white py-2 rounded-sm font-semibold transition text-sm"
              style={{ backgroundColor: "#101828" }}
            >
              Create Account
            </button>
          </form>

          <p
            className="text-sm text-center text-gray-500 mt-4 cursor-pointer"
            onClick={() => setisSignIn(true)}
          >
            Already have an account?{" "}
            <span className="font-medium hover:underline text-[#101828]">
              Login
            </span>
          </p>
        </div>
      </div>
    );
  }
};

export default SignupPage;
