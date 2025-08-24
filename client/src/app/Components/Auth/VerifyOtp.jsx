"use client";

import { AuthContext } from "@/app/Context/AuthContext";
import React, { useContext, useRef, useState } from "react";

const VerifyOtp = ({ email, setisSignIn }) => {
  const { VerifyOtp } = useContext(AuthContext);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // allow only digits and empty

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setError("");

    // Move to next input if digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    const res = await VerifyOtp({ email, otp: fullOtp });

    if (res.message) {
      setSuccess(true);
      setTimeout(() => {
        setisSignIn(true);
      }, 2000);
    } else {
      setError(res.error || "Invalid OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
      {success && (
        <div className="absolute top-6 bg-green-500 text-white px-6 py-2 rounded-md shadow-lg text-sm font-medium animate-bounce">
          OTP Verified Successfully!
        </div>
      )}

      <div className="bg-white w-full max-w-md p-8 border border-gray-200 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#101828]">
          Verify OTP
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 text-center border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-lg font-semibold"
                style={{ backgroundColor: "#f8f9fa" }}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded-sm font-semibold transition text-sm mt-4"
            style={{ backgroundColor: "#101828" }}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
