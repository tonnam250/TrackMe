"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error adding user");

      setMessage("User added successfully!");
      setTimeout(() => router.push("/admin/user"), 1000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 pt-24 flex justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Add User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-blue-900">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-blue-900">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-blue-900">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-blue-900">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-900">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-900">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-900">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-900">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Carrier">Carrier</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white w-full py-4 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            {loading ? "Saving..." : "Add User"}
          </button>

          {message && (
            <p className="text-center mt-4 text-blue-800 font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
