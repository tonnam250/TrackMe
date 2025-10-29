"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import AlertModal from "@/components/AlertModal";

export default function Signin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTopic, setModalTopic] = useState("");
  const [modalButtonColor, setModalButtonColor] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalTopic("Login Failed");
        setModalMessage(data.message || "Unknown error");
        setModalButtonColor("bg-red-600");
        setModalOpen(true);
        return;
      }

      // Success
      setModalTopic("Login Successful");
      setModalMessage("Welcome, " + data.user.username + "!");
      setModalButtonColor("bg-green-600");
      setModalOpen(true);

      // Save login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      // Optionally redirect after modal
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (err) {
      console.error("Network error:", err);
      setModalTopic("Network Error");
      setModalMessage("Check console for details.");
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center pt-24">
      <div className="bg-white p-12 md:p-14 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-black block font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
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
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-xl"
          >
            Sign In
          </button>
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Modal */}
      <AlertModal
        isOpen={modalOpen}
        topic={modalTopic}
        message={modalMessage}
        buttonColor={modalButtonColor}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
