"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import AlertModal from "@/components/AlertModal";

export default function Signup() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTopic, setModalTopic] = useState("");
  const [modalButtonColor, setModalButtonColor] = useState("");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setModalMessage("Error creating user: " + (data?.message || "Unknown"));
      } else {
        setModalMessage("User created successfully!");
        setModalTopic("Successful!");
        setModalButtonColor("bg-green-600");
        setFormData({ firstname: "", lastname: "", username: "", email: "", password: "", confirmPassword: "", phone: "", address: "" });
      }
      setModalOpen(true);
    } catch (err) {
      console.error("Network error:", err);
      setModalMessage("Network error, check console.");
      setModalButtonColor("bg-red-600");
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center pt-24">
      <div className="bg-white p-12 md:p-14 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-xl">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
          <label className="text-black block font-medium mb-2">Firstname</label>
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
          <div>
          <label className="text-black block font-medium mb-2">Surname</label>
          <input
            type="text"
            name="lastname"
            placeholder="Surname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
          <div>
          <label className="text-black block font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
          <div>
          <label className="text-black block font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
          <div>
          <label className="text-black block font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
          <div>
          <label className="text-black block font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
          <div>
          <label className="text-black block font-medium mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
          <div>
          <label className="text-black block font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
          />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-xl"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
      </div>

      <AlertModal 
      isOpen={modalOpen} 
      message={modalMessage} 
      topic={modalTopic} 
      buttonColor={modalButtonColor} 
      onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}
