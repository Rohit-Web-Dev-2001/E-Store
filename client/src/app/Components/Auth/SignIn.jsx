import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
const SignInPage = ({ setisSignIn }) => {
  const router = useRouter();
  const { SignIn } = useContext(AuthContext);
  const [showpassword, setshowpassword] = useState(false);
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, password } = formdata;

    if (!email) {
      setError("Please enter the email.");
      return;
    }

    if (!password) {
      setError("Please enter the  Password.");
      return;
    }

    const SigInuserPayload = {
      email,
      password,
    };

    const res = await SignIn(SigInuserPayload);

    if (res?.error) {
      console.log(res?.msg);
      setError(res?.msg);
      return;
      // setError(res.error);
    } else {
      setSuccess(true);
      setFormData({
        email: "",
        password: "",
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/");
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {success && (
        <div className="absolute top-6 bg-green-500 text-white px-6 py-2 rounded-md shadow-lg text-sm font-medium animate-bounce">
          Login Successfully!
        </div>
      )}
      <div className="bg-white w-full max-w-md p-8 border border-gray-200 rounded-md shadow-md">
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: "#101828" }}
        >
          Login to E-Store
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back! Please enter your credentials to continue.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formdata.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-sm"
            required
            onChange={handleChange}
          />

          <div className="relative w-full">
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#101828] text-sm"
              value={formdata.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setshowpassword(!showpassword)}
            >
              {showpassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded-sm font-semibold transition text-sm"
            style={{ backgroundColor: "#101828" }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Login
          </button>
        </form>

        <p
          className="text-sm text-center text-gray-500 mt-4"
          onClick={() => {
            setisSignIn(false);
          }}
        >
          Don’t have an account?{" "}
          <a
            href="#"
            style={{ color: "#101828" }}
            className="font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
