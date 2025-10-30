"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching users");
        setUsers(data.users || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
  //       Loading users...
  //     </div>
  //   );

  // if (error)
  //   return (
  //     <div className="flex justify-center items-center min-h-screen text-red-500 text-lg font-semibold">
  //       {error}
  //     </div>
  //   );

  return (
  <div className="min-h-screen bg-blue-100 pt-24">
    <div className="flex justify-between items-center mb-10 px-6 md:px-10">
      <h1 className="md:text-6xl font-extrabold text-blue-800 mb-14 drop-shadow-sm">
        User Management
      </h1>
      <button className="bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold shadow-md hover:scale-105 hover:bg-blue-800 transition-transform duration-200">
        + Add User
      </button>
    </div>

    <div className="px-4 md:px-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-x-auto">
        <table className="w-full border-collapse text-left text-gray-800 min-w-[700px]">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-4 font-medium">Username</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Address</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b border-gray-100 hover:bg-blue-50 transition"
              >
                <td className="p-4 font-medium">{u.username}</td>
                <td className="p-4">{`${u.first_name} ${u.last_name}`}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.phone}</td>
                <td className="p-4">{u.address}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      u.role === "Admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-150">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);