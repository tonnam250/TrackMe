"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import AlertModal from "@/components/AlertModal";

export default function Signup() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTopic, setModalTopic] = useState("");

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
        setModalTopic("Successful!")
        setFormData({ firstname: "", lastname: "", username: "", email: "", password: "", confirmPassword: "", phone: "", address: "" });
      }
      setModalOpen(true);
    } catch (err) {
      console.error("Network error:", err);
      setModalMessage("Network error, check console.");
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Surname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="p-3 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>

      <AlertModal isOpen={modalOpen} message={modalMessage} topic={modalTopic} onClose={() => setModalOpen(false)} />

    </div>
  );
}
