"use client";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* พื้นหลังสีฟ้าอ่อน + กล่อง signup กลางจอ */}
      <div className="min-h-[100vh] flex flex-col items-center justify-center bg-blue-100 py-20">
        <h1 className="md:text-7xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">
          Sign Up
        </h1>

        <div className="bg-white p-12 md:p-14 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-5xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Firstname */}
              <div>
                <label className="text-black block font-medium mb-2">Firstname</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Surname */}
              <div>
                <label className="text-black block font-medium mb-2">Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                  className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Username */}
              <div>
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

              {/* Email */}
              <div>
                <label className="text-black block font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
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

              {/* Confirm Password */}
              <div>
                <label className="text-black block font-medium mb-2">Confirm Password*</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-black block font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-black block font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="text-black w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 flex flex-col items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-5 px-14 text-2xl rounded-lg hover:bg-blue-700 transition w-full"
              >
                Sign Up
              </button>

              <p className="text-gray-600 mt-5 text-lg">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
