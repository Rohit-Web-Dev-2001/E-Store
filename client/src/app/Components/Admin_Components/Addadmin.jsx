import { AuthContext } from "@/app/Context/AuthContext";
import React, { useContext, useState } from "react";

const AddadminFormModal = ({ onClose }) => {
  const { SignUp, VerifyOtp } = useContext(AuthContext);
  const [msg, setmsg] = useState(null);
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // "form" or "otp"
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!admin.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!admin.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!admin.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(admin.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!admin.password.trim()) newErrors.password = "Password is required.";
    if (!admin.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (admin.password !== admin.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role, firstName, lastName } = admin;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const adminObj = {
      firstName,
      lastName,
      email,
      password,
      role,
    };
    const res = await SignUp(adminObj);
    setmsg(res.message);
    // Send OTP to email here (backend integration)
    setStep("otp");
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const { email } = admin;
    if (!otp.trim()) {
      setErrors({ otp: "OTP is required." });
      return;
    }

    if (!email) {
      setErrors({ otp: "Email is required." });
      return;
    }
    const optObj = {
      email,
      otp,
    };
    // TODO: Verify OTP with backend here
    const res = await VerifyOtp(optObj);
    if (res.error) {
      setErrors({ otp: res.error });
    } else {
      setTimeout(() => {
        setmsg(res.message);
      }, 2000);
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
        {step === "form" ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full p-2 border rounded"
                    value={admin.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full p-2 border rounded"
                    value={admin.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  value={admin.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                  value={admin.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-2 border rounded"
                  value={admin.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              {msg && <p className="text-red-500 text-sm">{msg}</p>}
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full p-2 border rounded"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setErrors({ ...errors, otp: "" });
                }}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp}</p>
              )}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Verify
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddadminFormModal;
