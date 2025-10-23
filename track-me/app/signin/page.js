"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
  
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "/";
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* พื้นหลังสีฟ้าอ่อน + กล่อง signin กลางจอ */}
      <div className="min-h-[100vh] flex flex-col items-center justify-center bg-blue-100 py-20">
        <h1 className="md:text-7xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">
          Sign In
        </h1>

        <div className="bg-white p-12 md:p-14 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-xl">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">
              Welcome Back!
            </h2>

            {/* Username */}
            <div className="mb-6">
              <label className="text-black block font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-black block font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-6">
              <Link
                href="#"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-5 px-14 text-2xl rounded-lg hover:bg-blue-700 transition w-full"
              >
                Sign In
              </button>

              <p className="text-gray-600 mt-5 text-lg">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
